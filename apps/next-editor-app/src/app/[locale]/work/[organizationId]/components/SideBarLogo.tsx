export const SideBarLogo = ({ name = 'SlayKit-Docs' }) => {
  return (
    <div className="w-full h-[88px] flex justify-center items-center">
      <div className="w-full text-center">
        <div className="inline-flex px-[5px] py-[8px] cursor-pointer">{name}</div>
      </div>
    </div>
  )
}
