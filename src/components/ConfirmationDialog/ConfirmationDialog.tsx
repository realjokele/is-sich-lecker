import { Modal } from '~/components/ui/modal'
import { buttonStyles } from '~/components/ui/button'

type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => void
}

export function ConfirmationDialog({
  open = false,
  onOpenChange,
  title,
  description,
  confirmButtonText = 'Okay',
  cancelButtonText = 'Abbrechen',
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <Modal.Content role="alertdialog" isOpen={open} onOpenChange={onOpenChange}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
        <Modal.Description>{description}</Modal.Description>
      </Modal.Header>
      <Modal.Footer className="flex justify-end gap-2">
        <Modal.Close className={buttonStyles({ intent: 'outline' })}>
          {cancelButtonText}
        </Modal.Close>
        <Modal.Close className={buttonStyles({ intent: 'danger' })} onClick={onConfirm}>
          {confirmButtonText}
        </Modal.Close>
      </Modal.Footer>
    </Modal.Content>
  )
}
