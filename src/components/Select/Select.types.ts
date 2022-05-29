export type Props = {
    label: string;
    options?: string[];
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
    isLoading?: boolean;
    isError?: boolean;
    value: string;
};
