
const Settings = () => {
  return (
    <section className="w-full max-w-full pl-1 xl:w-6/12">
        <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 dark:bg-gray-900 shadow-soft-xl rounded-2xl bg-clip-border">
            <div className="flex-auto p-4">
                <h6 className="mb-4 text-xs font-bold leading-tight uppercase text-slate-500 dark:text-white">Email Settings</h6>
                <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                    <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg dark:bg-gray-900 text-inherit">
                    <div className="min-h-6 mb-0.5 flex pl-0">
                        <input id="follow" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                        checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"   />
                        <label htmlFor="follow" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500 dark:text-white" >Email me when someone follows me</label>
                    </div>
                    </li>
                    <li className="relative block px-0 py-2 bg-white border-0 dark:bg-gray-900 text-inherit">
                    <div className="min-h-6 mb-0.5 flex pl-0">
                        <input id="answer" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-['']
                        checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                        <label htmlFor='answer' className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500 dark:text-white" >Email me when someone answers on my post</label>
                    </div>
                    </li>
                    <li className="relative block px-0 py-2 bg-white border-0 rounded-b-lg dark:bg-gray-900 text-inherit">
                    <div className="min-h-6 mb-0.5 flex pl-0">
                        <input id="mention" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                        after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                        border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                        after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                        checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"  />
                        <label htmlFor="mention" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500 dark:text-white" >Email me when someone mentions me</label>
                    </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default Settings