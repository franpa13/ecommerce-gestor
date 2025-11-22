

export const GlobalSpinner = () => {


    return (
        <div className="fixed left-0 top-0 backdrop-blur-lg h-screen w-screen bg-black/60 flex items-center justify-center z-50">
            <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full" />
        </div>
    )
}
