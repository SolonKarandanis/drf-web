import Link from 'next/link'
import {FC} from 'react'


const RecentActivity = () => {
  return (
    <div className="col-span-12 xl:col-span-8">
        <div className="box">
            <div className="flex justify-between box-header">
                <div className="box-title">
                    Recent Transactions
                </div>
                <div>
                    <span className="badge bg-primary/10 text-primary">Today</span>
                </div>
            </div>
            <div className="box-body">
                
            </div>
        </div>
    </div>
  )
}

export default RecentActivity