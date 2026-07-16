"use client";

import type { AnswerValue, Question } from "@/lib/quizzes/types";

const voiceLabel: Record<string, string> = {
  parent: "For the parent",
  child: "For the child",
};

export interface QuestionCardProps {
  question: Question;
  value: AnswerValue | undefined;
  /** Scale and yesno: sets the answer and lets the flow auto advance. */
  onSelectSingle: (value: AnswerValue) => void;
  /** Multi: toggles one option value in the selected list. */
  onToggleMulti: (value: string) => void;
  /** Time and text: updates the free response. */
  onChangeText: (value: string) => void;
}

const selectableBase =
  "w-full rounded-2xl border-2 px-5 py-4 text-left text-body transition duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage";
const selectableIdle = "border-sage/30 bg-white text-ink hover:border-sage hover:bg-sage/5";
const selectableActive = "border-sage bg-sage text-white";

export function QuestionCard({
  question,
  value,
  onSelectSingle,
  onToggleMulti,
  onChangeText,
}: QuestionCardProps) {
  const selectedList = Array.isArray(value) ? value : [];

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <p className="text-eyebrow">{question.section}</p>
        {question.voice ? (
          <span className="text-small font-semibold uppercase tracking-wide text-terracotta">
            {voiceLabel[question.voice]}
          </span>
        ) : null}
      </div>

      <h2 className="text-h3 mt-3 text-forest">{question.prompt}</h2>

      {question.helper ? (
        <p className="text-small mt-2 text-forest/70">{question.helper}</p>
      ) : null}

      <div className="mt-6">
        {question.type === "scale" ? (
          <div className="flex flex-col gap-3">
            {(question.options ?? []).map((option) => {
              const optionScore = option.score ?? Number(option.value);
              const active = value === optionScore;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onSelectSingle(optionScore)}
                  aria-pressed={active}
                  className={`${selectableBase} ${active ? selectableActive : selectableIdle}`}
                >
                  {option.label}
                </button>
              );
            })}
            <p className="text-small mt-1 text-forest/60">
              Choosing an answer moves you to the next question.
            </p>
          </div>
        ) : null}

        {question.type === "yesno" ? (
          <div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Yes", val: true },
                { label: "No", val: false },
              ].map((choice) => {
                const active = value === choice.val;
                return (
                  <button
                    key={choice.label}
                    type="button"
                    onClick={() => onSelectSingle(choice.val)}
                    aria-pressed={active}
                    className={`${selectableBase} text-center ${
                      active ? selectableActive : selectableIdle
                    }`}
                  >
                    {choice.label}
                  </button>
                );
              })}
            </div>
            <p className="text-small mt-3 text-forest/60">
              Choosing an answer moves you to the next question.
            </p>
          </div>
        ) : null}

        {question.type === "multi" ? (
          <div className="flex flex-col gap-3">
            {(question.options ?? []).map((option) => {
              const active = selectedList.includes(option.value);
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => onToggleMulti(option.value)}
                  aria-pressed={active}
                  className={`${selectableBase} flex items-center gap-3 ${
                    active ? selectableActive : selectableIdle
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-5 w-5 flex-none items-center justify-center rounded-md border-2 ${
                      active ? "border-white bg-white/20" : "border-sage/50"
                    }`}
                  >
                    {active ? "✓" : ""}
                  </span>
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {question.type === "time" ? (
          <input
            type="time"
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChangeText(event.target.value)}
            className="text-body w-full max-w-xs rounded-2xl border-2 border-sage/30 bg-white px-5 py-4 text-ink focus:border-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
          />
        ) : null}

        {question.type === "text" ? (
          <input
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(event) => onChangeText(event.target.value)}
            placeholder="Type your answer"
            className="text-body w-full rounded-2xl border-2 border-sage/30 bg-white px-5 py-4 text-ink focus:border-sage focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
          />
        ) : null}
      </div>
    </div>
  );
}
