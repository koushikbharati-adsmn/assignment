import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { RxDrawingPin, RxDrawingPinFilled, RxHamburgerMenu, RxMagnifyingGlass, RxPlus } from 'react-icons/rx'
import { HiOutlineArrowDown, HiOutlineEllipsisVertical } from 'react-icons/hi2'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useFetchWorkflows } from '@/hooks/queries/fetchWorkflows'
import { Workflow } from '@/types/responses'
import { formatCreatedAt } from '@/utils/helper'
import { useState } from 'react'
import { useDebounce } from '@/hooks/common/useDebounce'
import { useNavigate } from 'react-router'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { usePinWorkflowMutation } from '@/hooks/mutations/usePinWorkflowMutation'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useDeleteWorkflowMutation } from '@/hooks/mutations/useDeleteMutation'

export default function Workflows() {
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const navigate = useNavigate()

  const debouncedSearch = useDebounce(searchTerm, 500)

  const { data: workflows, isLoading: isFetchingWorkflows } = useFetchWorkflows({
    search: debouncedSearch,
    page: pageNumber,
    limit: 8
  })

  const totalPages = workflows?.data?.workflows ? Math.ceil(workflows.data.count / 8) : 1

  const handleNext = () => {
    if (pageNumber >= totalPages) return
    setPageNumber(pageNumber + 1)
  }

  const handlePrevious = () => {
    if (pageNumber === 1) return
    setPageNumber(pageNumber - 1)
  }

  return (
    <div className='mx-auto flex max-w-7xl gap-4 p-4'>
      <Button
        className='bg-white shadow-none hover:cursor-pointer hover:border-red-500 hover:bg-red-50 hover:text-red-500'
        variant='outline'
        size='icon'
      >
        <RxHamburgerMenu className='size-4' />
      </Button>
      <div className='flex-1'>
        <h1 className='mt-0.5 mb-8 text-2xl font-bold'>Workflow Builder</h1>
        <div className='mb-6 flex items-center justify-between'>
          <div className='relative flex max-w-sm flex-1 items-center'>
            <Input
              className='bg-white shadow-none focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#88CAD1]'
              type='text'
              name='search'
              placeholder='Search By Workflow Name/ID'
              id='search'
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <RxMagnifyingGlass className='pointer-events-none absolute right-3 size-4' />
          </div>
          <Button className='font-normat text-sm hover:cursor-pointer' onClick={() => navigate('/new')}>
            <RxPlus className='size-4' />
            Create New Process
          </Button>
        </div>
        <div className='border bg-white p-6'>
          {isFetchingWorkflows ? (
            <p>Loading...</p>
          ) : workflows?.data?.workflows.length ? (
            <>
              <WorkflowTable data={workflows.data.workflows} />
              {totalPages > 1 && (
                <PaginationDemo currentPage={pageNumber} onNextPage={handleNext} onPreviousPage={handlePrevious} />
              )}
            </>
          ) : (
            <p>No workflow found. Create a new workflow to get started.</p>
          )}
        </div>
      </div>
    </div>
  )
}

interface WorkflowTableProps {
  data: Workflow[]
}

export function WorkflowTable({ data }: WorkflowTableProps) {
  const { mutateAsync: pinWorkflow, isPending } = usePinWorkflowMutation()
  const { mutateAsync: deleteWorkflow } = useDeleteWorkflowMutation()
  return (
    <Table>
      <TableHeader>
        <TableRow className='border-amber-500 hover:bg-white'>
          <TableHead>Workflow Name</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>Last Edited On</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className='text-transparent'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((workflow) => (
          <TableRow className='hover:bg-white' key={workflow.name}>
            <TableCell className='text-gray-500'>{workflow.name}</TableCell>
            <TableCell className='text-gray-500'>&#35;{workflow.id}</TableCell>
            <TableCell className='text-gray-500'>
              {workflow.users.name} &#124; {formatCreatedAt(workflow.updated_at)}
            </TableCell>
            <TableCell className='max-w-56 truncate text-gray-500'>{workflow.description}</TableCell>
            <TableCell className='flex items-center gap-4'>
              <Button
                size='icon'
                variant='ghost'
                disabled={isPending}
                onClick={() => pinWorkflow({ id: workflow.id, pinned: !workflow.pinned })}
              >
                {workflow.pinned ? (
                  <RxDrawingPinFilled className='size-5 text-yellow-500' />
                ) : (
                  <RxDrawingPin className='size-5' />
                )}
              </Button>
              <Button className='shadow-none hover:border-yellow-500 hover:bg-yellow-50' variant='outline'>
                Execute
              </Button>
              <Button className='shadow-none hover:border-yellow-500 hover:bg-yellow-50' variant='outline'>
                Edit
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button size='icon' variant='ghost'>
                    <HiOutlineEllipsisVertical className='size-5' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-fit p-0'>
                  <Dialog>
                    <DialogTrigger>
                      <Button className='text-destructive underline' variant='ghost'>
                        Delete
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='p-0'>
                      <DialogHeader className='p-4'>
                        <DialogTitle className='mt-8 mb-2 text-center text-base capitalize'>
                          Are you sure you want to delete this?
                        </DialogTitle>
                        <DialogDescription className='text-destructive text-center capitalize'>
                          You cannot undo this step.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className='border-t p-4'>
                        <Button
                          variant='outline'
                          onClick={() =>
                            deleteWorkflow({
                              id: workflow.id
                            })
                          }
                        >
                          Yes
                        </Button>
                        <DialogClose>
                          <Button variant='outline'>No</Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </PopoverContent>
              </Popover>

              <Button size='icon' variant='ghost'>
                <HiOutlineArrowDown className='size-5' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

interface PaginationProps {
  onNextPage: () => void
  onPreviousPage: () => void
  currentPage: number
}

export function PaginationDemo({ onNextPage, onPreviousPage, currentPage = 1 }: PaginationProps) {
  return (
    <Pagination className='justify-end border-t pt-6'>
      <PaginationContent>
        <PaginationItem className='hover:cursor-pointer' onClick={onPreviousPage}>
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink isActive>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem className='hover:cursor-pointer' onClick={onNextPage}>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
