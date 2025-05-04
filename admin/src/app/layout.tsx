import { Toaster } from 'react-hot-toast';
import ThemeRegistry from './ThemeRegistry';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ThemeRegistry>{children}</ThemeRegistry>
                <Toaster position='top-right' reverseOrder={false} />
            </body>
        </html>
    );
}
