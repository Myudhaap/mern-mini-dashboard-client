import { useSelector } from "react-redux"

export default function Profile() {
    const {auth} = useSelector(state => state.auth)
    return (
        <div>
            <span className="text-sm text-gray-500 font-semibold">Welcome, {auth.name}</span>
        </div>
    )
}
