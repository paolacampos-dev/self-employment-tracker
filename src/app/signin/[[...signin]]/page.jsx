import { SignIn } from "@clerk/nextjs";


export default function Page() {
    return (
        <div className="sign-container">
            <h1 className="wellcome">Lest's continue earning!!</h1>
            <SignIn appearance={{
                        variables: {
                            colorPrimary: "#b97a18"
                        }                            
                    }}                       
                    afterSingInUrl="/freelancer" />
        </div>
    );
}