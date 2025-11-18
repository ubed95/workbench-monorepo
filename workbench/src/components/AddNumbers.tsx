import type { ChangeEvent } from 'react'
import { add } from '@mono/utils'
import { Box, Button, Input, Typography } from '@mui/material'
import { useState } from 'react'

function AddNumbers() {
  const [nums, setNums] = useState({
    a: '',
    b: '',
  })

  const handleNumChange = (key: keyof typeof nums) => (e: ChangeEvent<HTMLInputElement>) => {
    setNums(prevNums => ({
      ...prevNums,
      [key]: e.target.value,
    }))
  }

  const result = add(Number(nums.a), Number(nums.b))

  return (
    <Box className="p-4 m-4 border border-gray-300 rounded-lg shadow-md">
      <Typography variant="h6" className="mb-4">
        MUI + Tailwind Integration Test
      </Typography>
      <Box className="flex gap-4 items-center flex-wrap">
        <Input
          id="component-outlined"
          placeholder="Type your name"
          onChange={handleNumChange('a')}
          slotProps={{
            root: {
              className:
              'mt-0 -ml-0.5 px-2 h-10 border border-neutral-300 dark:border-neutral-700 rounded-md has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm before:hidden after:hidden',
            },
            input: {
              className:
              'placeholder:opacity-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            },
          }}
        />
        <Input
          id="component-outlined"
          placeholder="Type your name"
          onChange={handleNumChange('b')}
          slotProps={{
            root: {
              className:
              'mt-0 -ml-0.5 px-2 h-10 border border-neutral-300 dark:border-neutral-700 rounded-md has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm before:hidden after:hidden',
            },
            input: {
              className:
              'placeholder:opacity-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
            },
          }}
        />
        <Button
          variant="contained"
          onClick={() => {

          }}
        >
          Add
        </Button>
        {!Number.isNaN(result) && (
          <Typography variant="body1" className="ml-4 font-bold">
            Result:
            {' '}
            {result}
          </Typography>
        )}
      </Box>
    </Box>
  )
}
export default AddNumbers
