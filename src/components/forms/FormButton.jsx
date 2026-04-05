export default function FormButton({ children }) {
    return (
        <div className="flex justify-center mt-4">
            <button className="app-button">
                {children}
            </button>
        </div>
    );
}