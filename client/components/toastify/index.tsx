/* eslint-disable @typescript-eslint/ban-ts-comment */
import { toast } from 'react-toastify';

export const succesToastMessage = (values: string, time: number, position: string) => {
    toast.success(`${values}`, {
        //@ts-expect-error
        position: position || 'top-right',
        autoClose: time || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};

export const errorToastMessage = (values: string, time: number, position: string) => {
    toast.error(`${values}`, {
         //@ts-expect-error
        position: position || 'top-right',
        autoClose: time || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const warningToastMessage = (values: any, time: any, position: any) => {
    toast.warning(`${values}`, {
        position: position || 'top-right',
        autoClose: time || 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    });
};