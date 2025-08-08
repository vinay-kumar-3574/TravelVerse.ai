import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog'

const Modal = ({ open, onOpenChange, title, description, children, footer }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
        )}
        <div className="mt-2">{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </DialogContent>
    </Dialog>
  )
}

export default Modal