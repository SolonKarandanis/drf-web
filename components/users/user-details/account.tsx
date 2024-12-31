
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/shadcn/components/ui/tabs';
import Settings from './settings';
import ChangePassword from './change-password';


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
                                <Settings />
                            </TabsContent>
                            <TabsContent value="change-password">
                                <ChangePassword />
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