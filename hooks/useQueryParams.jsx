'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const useQueryParams = (key) => {
    let searchParams = useSearchParams()
    const router = useRouter()
    let getValue = () => searchParams.get(key)
    const setValue = (value) => {
        const params = new URLSearchParams(searchParams.toString())
        if (value !== null && value !== undefined && value !== '') {
            params.set(key, value)
        } else {
            params.delete(key)
        }
        return router.push(`?${params.toString()}`, { scroll: false })
    }
    return [getValue(), setValue]
}

export default useQueryParams