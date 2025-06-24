interface LabeledStateOptions {
  stateValue: any
  stateTailwind?: string
  label?: string
  labelTailwind?: string
}

export default function LabeledState({
  stateValue,
  stateTailwind,
  label,
  labelTailwind,
}: LabeledStateOptions) {
  return (
    <div className="labeled-state-container flex flex-row w-full justify-start">
      <p
        className={`label-text text-app-font-strong text-left w-28 ${labelTailwind}`}
      >
        {label}
      </p>
      <p
        className={`state-text text-app-font-strong text-left w-28 ${stateTailwind}`}
      >
        {stateValue}
      </p>
    </div>
  )
}
