import { useNavigate } from 'react-router'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import { RiSave3Fill } from 'react-icons/ri'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { workflowFormSchema } from '@/lib/validations'
import { z } from 'zod'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCreateWorkflowMutation } from '@/hooks/mutations/useCreateWorkflowMutation'
import { Background, Controls, Node, ReactFlow, useNodesState } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import CircularNode from '@/components/workflow/CircularNode'

const initialNodes: Node[] = [
  {
    id: '1',
    data: { label: 'start' },
    position: { x: 0, y: 0 },
    type: 'default'
  },
  {
    id: '2',
    data: { label: 'end' },
    position: { x: 0, y: 100 },
    type: 'default'
  }
]

export default function CreateWorkflow() {
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof workflowFormSchema>>({
    resolver: zodResolver(workflowFormSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const { mutateAsync: createWorkflow, isPending: isCreating } = useCreateWorkflowMutation()

  const onSubmit = async (data: z.infer<typeof workflowFormSchema>) => {
    createWorkflow({ name: data.name, description: data.description })
  }

  const nodeTypes = {
    default: CircularNode
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)

  return (
    <div style={{ width: '100dvw', height: '100dvh', position: 'relative' }}>
      <div className='absolute top-4 left-4 z-10 flex items-center justify-center gap-6 rounded-md border bg-white px-4 py-2 shadow-sm'>
        <button
          className='flex items-center border-b border-gray-600 text-sm font-semibold'
          onClick={() => navigate(-1)}
        >
          <HiOutlineArrowLeft className='size-4' />
          Go Back
        </button>
        <p className='text-sm font-semibold'>Untitled</p>
        <Dialog>
          <DialogTrigger>
            <RiSave3Fill className='size-5 text-yellow-500' />
          </DialogTrigger>
          <DialogContent className='p-0'>
            <DialogHeader className='p-6'>
              <DialogTitle>Save your workflow</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form id='save-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 px-6 pb-6'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input className='h-10 bg-white shadow-none' type='text' placeholder='Name here' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea className='resize-none bg-white shadow-none' placeholder='Write here...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <DialogFooter className='border-t p-4'>
              <Button form='save-form' type='submit' variant='destructive' disabled={isCreating}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <ReactFlow nodes={nodes} onNodesChange={onNodesChange} nodeTypes={nodeTypes} fitView>
        <Controls />
        <Background />
      </ReactFlow>
    </div>
  )
}
