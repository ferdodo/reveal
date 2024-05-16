export interface DateStorage {
    read: () => Date;
    save?: (date: Date) => void;
}