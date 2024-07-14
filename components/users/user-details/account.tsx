
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/shadcn/components/ui/tabs';


const Account = () => {

    return (
        <div className="col-span-12 xl:col-span-12">
            <div className="box">
                <div className="box-header">
                    <div className="box-title">
                        Account
                    </div>
                </div>
                <div className="box-body !p-0">
                    <div className="!p-4 border-b dark:border-defaultborder/10 border-dashed md:flex items-center justify-between">
                        <Tabs defaultValue="settings" className="w-full">
                            <TabsList>
                                <TabsTrigger 
                                    value="settings">
                                    Settings
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="change-password">
                                    Change Password
                                </TabsTrigger>
                                <TabsTrigger 
                                    value="status">
                                    Status
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="settings">
                                <div className="w-full max-w-full pl-1 xl:w-6/12">
                                    <div className="relative flex flex-col h-full min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
                                        <div className="flex-auto p-4">
                                            <h6 className="mb-4 text-xs font-bold leading-tight uppercase text-slate-500">Email Settings</h6>
                                            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                                <li className="relative block px-0 py-2 bg-white border-0 rounded-t-lg text-inherit">
                                                <div className="min-h-6 mb-0.5 flex pl-0">
                                                    <input id="follow" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                                    after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                                    border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                                    after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                                                    checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"   />
                                                    <label htmlFor="follow" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone follows me</label>
                                                </div>
                                                </li>
                                                <li className="relative block px-0 py-2 bg-white border-0 text-inherit">
                                                <div className="min-h-6 mb-0.5 flex pl-0">
                                                    <input id="answer" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                                    after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                                    border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                                    after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-['']
                                                    checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox" />
                                                    <label htmlFor='answer' className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone answers on my post</label>
                                                </div>
                                                </li>
                                                <li className="relative block px-0 py-2 bg-white border-0 rounded-b-lg text-inherit">
                                                <div className="min-h-6 mb-0.5 flex pl-0">
                                                    <input id="mention" className="rounded-10 duration-250 ease-soft-in-out after:rounded-circle after:shadow-soft-2xl 
                                                    after:duration-250 checked:after:translate-x-5.25 h-5 relative float-left w-10 cursor-pointer appearance-none border 
                                                    border-solid border-gray-200 bg-slate-800/10 bg-none bg-contain bg-left bg-no-repeat align-top transition-all 
                                                    after:absolute after:top-px after:h-4 after:w-4 after:translate-x-px after:bg-white after:content-[''] 
                                                    checked:border-slate-800/95 checked:bg-slate-800/95 checked:bg-none checked:bg-right" type="checkbox"  />
                                                    <label htmlFor="mention" className="w-4/5 mb-0 ml-4 overflow-hidden text-sm font-normal cursor-pointer select-none text-ellipsis whitespace-nowrap text-slate-500" >Email me when someone mentions me</label>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="change-password">
                                Change your password here.
                            </TabsContent>
                            <TabsContent value="status">
                                Status
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account