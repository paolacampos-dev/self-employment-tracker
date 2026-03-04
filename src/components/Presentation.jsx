export default function PresentationPage()  {
    return (
        <>
            <div className="flex flex-col">
                <div className="presentation-container text-xl font-semibold max-w-xl mx-auto">
                    <h2 className="heading-presentationOne">
                        Manage all your workload with SelfTrack
                    </h2>
                    <p>Clients · Jobs · Expenses · Invoices · Schedule · Finance</p>
                </div>
                <div className="presentation-container">
                    <h2 className="heading-presentationTwo mb-1">
                        The simple tracker for freelancers earning under £100K/year 
                    </h2>
                    <p>Keep all your records organised and estimate your taxes easily.</p>
                </div>
            </div>
        </>
    )
}