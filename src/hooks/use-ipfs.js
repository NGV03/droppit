import { useEffect, useState } from 'react'
import dotProp from 'dot-prop'

export default function useIpfs (ipfs, cmd, opts) {
    const [ res, setRes ] = useState(null)

    useEffect(() => {
        callIpfs(ipfs, cmd, opts, setRes)
    }, [ipfs, cmd, opts])

    return res
}

async function callIpfs (ipfs, cmd, opts, setRes) {
    if (!ipfs) return null

    console.log(`Call ipfs.${cmd}`)
    const ipfsCmd = dotProp.get(ipfs, cmd)
    const res = await ipfsCmd(opts)
    console.log(`Result ipfs.${cmd}`, res)
    setRes(res)
}