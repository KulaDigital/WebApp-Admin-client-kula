import * as React from 'react';
import Drawer from '@mui/material/Drawer';

interface CommonDrawerProps {
    open: boolean;
    children: React.ReactNode;
    close: () => void;
    placement?: 'left' | 'right' | 'top' | 'bottom';
    height?: string;
    width?: string;
}

export default function CommonDrawer({ open, close, children, extra, placement = 'right',
    height = '85vh',
    width = '85vw', }: CommonDrawerProps) {


    return (
        <Drawer open={open} onClose={close} width={width}
            height={height}
            extra={extra}
            anchor={placement}
            styles={{
                body: {
                    padding: '20px 50px',
                    transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                    overflow: 'visible',
                },
                mask: {
                    transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1)',
                }
            }}>
            {children}

        </Drawer>
    )
}