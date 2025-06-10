import Button from '../ui/Button'

export default function TopBar() {
  return (
    <div className="app-top-bar flex flex-row h-[5vh] mx-5 mt-2 mb-[2px]">
      <div className="app-logo w-56 relative bottom-2 flex flex-row">
        <span className="mr-1">dev</span>
        <p className="font-semibold">PALETTE TOOLS</p>
      </div>
      <div className="toolbar relative flex flex-row w-full justify-end items-end z-10">
        <Button type="text" label="save" action={() => {}} />
        <Button type="text" label="load" action={() => {}} />
        <Button type="text" label="reset" action={() => {}} />
        <Button type="text" label="settings" action={() => {}} />
        <Button type="text" label="signin" action={() => {}} />
      </div>
    </div>
  )
}
