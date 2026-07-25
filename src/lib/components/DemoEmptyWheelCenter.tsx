'use client'

export default function DemoEmptyWheelCenter() {
  return (
    <div className="overwrite-tw-file-container absolute top-[90px] left-[90px]">
      <button className="apply-btn w-[120px] h-[120px] text-app-gray-200 bg-app-gray-700 border border-app-gray-700 rounded-full cursor-default  z-20">
        <div className="apply-btn-label-container flex flex-col">
          <span className="apply-btn-label uppercase font-semibold mb-1">
            Demo
          </span>
          <div className="separator w-[79px] h-[1px] mx-auto bg-app-gray-400"></div>
          <span className="apply-btn-info min-h-[26px] text-sm">
            TW override not available
          </span>
        </div>
      </button>
    </div>
  )
}
