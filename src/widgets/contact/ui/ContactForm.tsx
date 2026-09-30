'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { cn } from '@/shared/lib/cn'
import { ContactStatus, contactInitialState } from '@/shared/types'
import { sendContact } from '@/shared/api/sendContact'
import { CONTACT_INPUT_CLASS, CONTACT_LABEL_CLASS } from '../constants'

function SubmitButton(): React.ReactElement {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'self-start inline-flex items-center gap-2.5 px-4 py-2.5',
        'border border-accent bg-accent text-accent-on',
        'font-mono text-[13px] transition-colors duration-150',
        'hover:border-accent-soft hover:bg-accent-soft',
        'disabled:cursor-not-allowed disabled:opacity-40',
      )}
    >
      {pending ? 'sending…' : '$ send --message'}
    </button>
  )
}

export function ContactForm(): React.ReactElement {
  const [state, action] = useActionState(sendContact, contactInitialState)

  if (state.status === ContactStatus.Success) {
    return (
      <div className="flex flex-col gap-2 border border-rule bg-paper-card/60 p-5">
        <span className="font-mono text-[12px] text-accent">✓ 200 OK — message sent</span>
        <p className="text-lg">Thanks — I&apos;ll get back to you soon.</p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label className={CONTACT_LABEL_CLASS}>--name</label>
          <input
            name="name"
            type="text"
            placeholder="John Doe"
            required
            maxLength={100}
            className={CONTACT_INPUT_CLASS}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className={CONTACT_LABEL_CLASS}>--email</label>
          <input
            name="email"
            type="email"
            placeholder="john@company.com"
            required
            className={CONTACT_INPUT_CLASS}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className={CONTACT_LABEL_CLASS}>--message</label>
        <textarea
          name="message"
          placeholder="Say hi, share an idea or a link…"
          required
          minLength={10}
          maxLength={2000}
          rows={4}
          className={cn(CONTACT_INPUT_CLASS, 'resize-none')}
        />
      </div>

      {state.status === ContactStatus.Error && (
        <p className="text-sm text-accent">{state.message}</p>
      )}

      <SubmitButton />
    </form>
  )
}
