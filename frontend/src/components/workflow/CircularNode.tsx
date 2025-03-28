import { Node, NodeProps } from '@xyflow/react'

type CircularNode = Node<{ label: 'start' | 'end' }, 'custom'>

export default function CircularNode({ data }: NodeProps<CircularNode>) {
  return (
    <div
      className={`flex size-12 items-center justify-center rounded-full ${data.label === 'start' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      <div
        className={`flex size-10 items-center justify-center rounded-full border-3 border-white text-white ${data.label === 'start' ? 'bg-green-500' : 'bg-red-500'}`}
      >
        {data.label}
      </div>
    </div>
  )
}
