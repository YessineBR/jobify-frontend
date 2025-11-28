"use client";

import React from "react";
import {toast as sonnerToast} from "sonner";
import type {ExternalToast as ToastOptions} from "sonner";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */
type ActionButtonProps = { label: string; onClick: () => void };
type ToastActionElement = React.ReactElement<ActionButtonProps>;

type ToastProps = {
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
    duration?: number;
};
type Toast = ToastProps & { id?: string };

/* ------------------------------------------------------------------ */
/* Helper                                                             */

/* ------------------------------------------------------------------ */
function toast({title, description, action, duration = 3_000, ...rest}: Toast) {
    const finalDuration = duration === Infinity ? Number.MAX_SAFE_INTEGER : duration;

    let sonnerAction: ActionButtonProps | undefined;
    if (action && React.isValidElement<ActionButtonProps>(action)) {
        const {label, onClick} = action.props;
        if (typeof onClick === "function") {
            sonnerAction = {label, onClick};
        }
    }

    if (!sonnerAction) {
        return sonnerToast(title ?? "", {description, duration: finalDuration, ...rest});
    }

    return sonnerToast.custom(
        (t) => (
            <div className="flex flex-col gap-2 p-4 bg-background border rounded-lg shadow-lg relative">
                <button
                    onClick={() => sonnerToast.dismiss(t)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Dismiss toast"
                >
                    &times;
                </button>

                {title && <div className="font-semibold">{title}</div>}
                {description && <div className="text-sm text-muted-foreground">{description}</div>}

                <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-border">
                    <button
                        onClick={() => sonnerToast.dismiss(t)}
                        className="px-3 py-1 text-sm border rounded hover:bg-accent transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => {
                            sonnerAction?.onClick();
                            sonnerToast.dismiss(t);
                        }}
                        className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                    >
                        {sonnerAction.label}
                    </button>
                </div>
            </div>
        ),
        {duration: finalDuration, ...rest}
    );
}

/* ------------------------------------------------------------------ */
/* Shorthands                                                         */
/* ------------------------------------------------------------------ */
toast.success = (title: string, description?: string, opts?: ToastOptions) =>
    sonnerToast.success(title, {description, ...opts});

toast.error = (title: string, description?: string, opts?: ToastOptions) =>
    sonnerToast.error(title, {description, ...opts});

toast.warning = (title: string, description?: string, opts?: ToastOptions) =>
    sonnerToast.warning(title, {description, ...opts});

toast.info = (title: string, description?: string, opts?: ToastOptions) =>
    sonnerToast.info(title, {description, ...opts});

toast.loading = (title: string, description?: string, opts?: ToastOptions) =>
    sonnerToast.loading(title, {description, ...opts});

toast.promise = <T, >(
    promise: Promise<T>,
    msgs: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((err: unknown) => string);
        description?: string;
        finally?: () => void;
    },
) => sonnerToast.promise(promise, msgs);

toast.dismiss = sonnerToast.dismiss;

/* ------------------------------------------------------------------ */
/* Hook                                                               */

/* ------------------------------------------------------------------ */
function useToast() {
    return {toast, dismiss: toast.dismiss};
}

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */
export {useToast, toast};