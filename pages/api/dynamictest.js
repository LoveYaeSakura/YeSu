import dynamic from 'next/dynamic'

const DynamicTest = dynamic(import('../test'), { ssr: false })

export default DynamicTest