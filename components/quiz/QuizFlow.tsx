"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Section, Container, Button, Sunburst } from "@/components";
import { getQuiz } from "@/lib/quizzes";
import type { Answers, AnswerValue } from "@/lib/quizzes/types";
import { ProgressBar } from "./ProgressBar";
import { QuestionCard } from "./QuestionCard";
import { LeadCaptureForm, type LeadFields } from "./LeadCaptureForm";
import { storeQuizResult } from "./session";
import { submitToWeb3Forms, WEB3FORMS_QUIZ_KEY } from "@/lib/web3forms";

type Phase = "intro" | "questions" | "lead";

const AUTO_ADVANCE_MS = 300;

export interface QuizFlowProps {
  slug: string;
}

export function QuizFlow({ slug }: QuizFlowProps) {
  const router = useRouter();
  const quiz = getQuiz(slug);

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!quiz) {
    return (
      <Section background="cream">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h1 className="text-h2 text-forest">Screening not found</h1>
            <p className="text-body mt-4">
              We could not find that screening. Choose one from the screening hub.
            </p>
            <div className="mt-6">
              <Button href="/sleep-apnea-test/">Back to screenings</Button>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  const questions = quiz.questions;
  const totalSteps = questions.length + 1;
  const currentQuestion = questions[index];
  const isLastQuestion = index === questions.length - 1;

  const clearTimer = () => {
    if (advanceTimer.current) {
      clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  };

  const start = () => {
    setPhase("questions");
    setIndex(0);
  };

  const goBack = () => {
    clearTimer();
    if (phase === "lead") {
      setPhase("questions");
      setIndex(questions.length - 1);
      return;
    }
    if (index === 0) {
      setPhase("intro");
      return;
    }
    setIndex(index - 1);
  };

  const goForward = () => {
    clearTimer();
    if (isLastQuestion) {
      setPhase("lead");
    } else {
      setIndex(index + 1);
    }
  };

  // Scale and yesno: record the answer, then auto advance after a brief tick.
  const handleSelectSingle = (value: AnswerValue) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
    clearTimer();
    advanceTimer.current = setTimeout(() => {
      advanceTimer.current = null;
      if (isLastQuestion) {
        setPhase("lead");
      } else {
        setIndex((prevIndex) => prevIndex + 1);
      }
    }, AUTO_ADVANCE_MS);
  };

  const handleToggleMulti = (optionValue: string) => {
    setAnswers((prev) => {
      const existing = Array.isArray(prev[currentQuestion.id])
        ? [...(prev[currentQuestion.id] as string[])]
        : [];
      const at = existing.indexOf(optionValue);
      if (at >= 0) existing.splice(at, 1);
      else existing.push(optionValue);
      return { ...prev, [currentQuestion.id]: existing };
    });
  };

  const handleChangeText = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canContinue = (): boolean => {
    const type = currentQuestion.type;
    if (type === "multi") return true;
    if (type === "time" || type === "text") {
      if (!currentQuestion.required) return true;
      const v = answers[currentQuestion.id];
      return typeof v === "string" && v.trim() !== "";
    }
    return answers[currentQuestion.id] !== undefined;
  };

  const handleLeadSubmit = (lead: LeadFields, honeypot: string) => {
    // Compute the result on the client so the result screen is instant.
    const result = quiz.scoring(answers);

    storeQuizResult({
      slug: quiz.slug,
      quizTitle: quiz.title,
      result,
      disclaimer: quiz.disclaimer,
      savedAt: Date.now(),
    });

    // Honeypot filled means a bot. Skip all delivery, still show the result.
    const isBot = honeypot.trim() !== "";

    // Fire and forget. The result never waits on the network.
    // The server route handles the integrity recompute, the optional Resend
    // notification with full answers, and the server side analytics events.
    if (!isBot) {
      void fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          quiz: quiz.slug,
          answers,
          result: { band: result.band, score: result.score },
          lead,
          consent: true,
          website: honeypot,
        }),
      }).catch(() => {
        // Delivery failures are handled server side. Nothing blocks the patient.
      });

      // Lead notification through Web3Forms, client side because the free plan
      // only accepts browser submissions. Only the contact fields plus which
      // screening and the score band are sent, never the raw per question
      // answers, which are protected health data and stay off this non BAA tool.
      const scoreText =
        result.score !== undefined
          ? `${result.score}${result.maxScore ? ` of ${result.maxScore}` : ""}`
          : "Not scored numerically";
      void submitToWeb3Forms(
        WEB3FORMS_QUIZ_KEY,
        `New screening lead: ${quiz.title} (${result.band})`,
        {
          from_name: lead.name,
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          city: lead.city,
          state: lead.state,
          screening: quiz.title,
          result_band: result.band,
          score: scoreText,
          replyto: lead.email,
          note: "Screening lead. Per question answers are intentionally omitted to keep protected health data off a non BAA tool.",
        },
      ).catch(() => {
        // Never block the patient on a delivery failure.
      });
    }

    router.push(`/sleep-apnea-test/${quiz.slug}/results/`);
  };

  const showContinue =
    phase === "questions" &&
    (currentQuestion.type === "multi" ||
      currentQuestion.type === "time" ||
      currentQuestion.type === "text");

  const progressValue =
    phase === "lead" ? questions.length / totalSteps : index / totalSteps;

  return (
    <main className="flex-1">
      <Section background="cream" className="relative overflow-hidden">
        <Sunburst
          opacity={0.1}
          className="pointer-events-none absolute -top-10 right-0 h-40 w-80"
        />
        <Container>
          <div className="mx-auto max-w-2xl">
            {phase === "intro" ? (
              <div className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
                <p className="text-eyebrow">{quiz.audience}</p>
                <h1 className="text-h1 mt-3 text-forest">{quiz.intro.heading}</h1>
                <p className="text-body mt-5">{quiz.intro.body}</p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center rounded-full bg-sage/10 px-4 py-2 text-small font-semibold text-forest">
                    {quiz.intro.timeEstimate}
                  </span>
                  <span className="text-small text-forest/70">
                    Your answers stay private and are used to prepare your results.
                  </span>
                </div>
                <div className="mt-8">
                  <Button type="button" onClick={start}>
                    Start the screening
                  </Button>
                </div>
                <p className="text-small mt-6 text-forest/70">{quiz.disclaimer}</p>
              </div>
            ) : null}

            {phase === "questions" ? (
              <div>
                <ProgressBar
                  value={progressValue}
                  label={`Question ${index + 1} of ${questions.length}`}
                />
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-10">
                  <QuestionCard
                    question={currentQuestion}
                    value={answers[currentQuestion.id]}
                    onSelectSingle={handleSelectSingle}
                    onToggleMulti={handleToggleMulti}
                    onChangeText={handleChangeText}
                  />
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-small font-semibold text-forest underline underline-offset-4 hover:text-sage"
                  >
                    Back
                  </button>
                  {showContinue ? (
                    <Button type="button" onClick={goForward} disabled={!canContinue()}>
                      Continue
                    </Button>
                  ) : (
                    <span className="text-small text-forest/50">
                      Choose an answer to continue
                    </span>
                  )}
                </div>
              </div>
            ) : null}

            {phase === "lead" ? (
              <div>
                <ProgressBar value={progressValue} label="Last step" />
                <div className="mt-8 rounded-3xl bg-white p-6 shadow-sm md:p-10">
                  <LeadCaptureForm onSubmit={handleLeadSubmit} />
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={goBack}
                    className="text-small font-semibold text-forest underline underline-offset-4 hover:text-sage"
                  >
                    Back
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <p className="text-small mt-10 text-center text-forest/60">
            Looking for a different age group?{" "}
            <Link href="/sleep-apnea-test/" className="text-sage underline">
              See all screenings
            </Link>
          </p>
        </Container>
      </Section>
    </main>
  );
}
