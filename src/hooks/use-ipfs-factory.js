import IPFS from 'ipfs'
import { useEffect, useState } from 'react'

let ipfs = null

export default function useIpfsFactory ({ commands }) {
    const [ isIpfsReady, setIpfsReady ] = useState(Boolean(ipfs))
    const [ ipfsInitError, setIpfsInitError ] = useState(null)

    useEffect(() => {
        startIpfs()
        return function cleanup () {
            if (ipfs && ipfs.stop) {
                console.log('Stopping IPFS')
                ipfs.stop().catch(err => console.error(err))
                setIpfsReady(false)
            }
        }
    })

    async function startIpfs () {
        if (ipfs) {
            console.log('IPFS is already started.')
        } else if (window.ipfs && window.ipfs.enable) {
            console.log('Found window.ipfs')
            ipfs = await window.ipfs.enable({ commands })
        } else {
            try {
                console.time('IPFS Started')
                ipfs = await IPFS.create()
                console.timeEnd('IPFS Started')
            } catch (error) {
                console.error('IPFS init error:', error)
                ipfs = null
                setIpfsInitError(error)
            }
        }

        setIpfsReady(Boolean(ipfs))
    }

    return { ipfs, isIpfsReady, ipfsInitError }
}