import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react';
import { createPortal } from 'react-dom';
import { cx } from '@/lib/cx';
import { Icon } from '@/components/Icon/Icon';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** Id på modalens overskrift. */
  labelledBy: string;
  children: ReactNode;
  /** Giver adgang til det område, der scroller, fx for at rulle til toppen. */
  contentRef?: RefObject<HTMLDivElement | null>;
  className?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal, der er forankret i toppen, så den ikke flytter sig, når indholdet vokser.
 * Indholdet scroller inde i modalen. Fokus holdes i modalen, Escape og klik udenfor lukker,
 * og fokus vender tilbage til knappen, der åbnede den.
 */
export function Modal({ open, onClose, labelledBy, children, contentRef, className }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pressedOnBackdrop = useRef(false);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open || !mounted) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add('modal-open');
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
      } else if (event.key === 'Tab') {
        keepFocusInside(event, dialogRef.current);
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('modal-open');
      previousFocus?.focus();
    };
  }, [open, mounted]);

  if (!mounted || !open) return null;

  // Luk kun, når både tryk og slip sker på baggrunden (ikke når man trækker en markering ud af modalen)
  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    pressedOnBackdrop.current = event.target === event.currentTarget;
  };
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (pressedOnBackdrop.current && event.target === event.currentTarget) onClose();
  };

  return createPortal(
    <div className="modal-backdrop" onMouseDown={handleMouseDown} onClick={handleClick}>
      <div ref={dialogRef} className={cx('modal', className)} role="dialog" aria-modal="true" aria-labelledby={labelledBy}>
        <button ref={closeRef} type="button" className="modal__close" aria-label="Luk" onClick={onClose}>
          <Icon name="button-close" size="large" />
        </button>
        <div ref={contentRef} className="modal__content">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}

function keepFocusInside(event: KeyboardEvent, root: HTMLElement | null) {
  if (!root) return;
  const focusable = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (element) => element.offsetParent !== null,
  );
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  const active = document.activeElement;

  if (!root.contains(active)) {
    event.preventDefault();
    first.focus();
  } else if (event.shiftKey && active === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && active === last) {
    event.preventDefault();
    first.focus();
  }
}
