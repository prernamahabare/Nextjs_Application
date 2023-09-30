export default function userprofile({ params }: any) {
    return (
        <div className="flex items-center min-h-screen flex-col justify-center py-2">
            <h1 className="text-center">
                profile page
                <span className="px-2 ml-2 bg-red-500">{params.id}</span></h1>
        </div>
    )
}