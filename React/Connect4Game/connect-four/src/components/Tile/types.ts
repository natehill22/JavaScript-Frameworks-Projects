//Defines Props as having an ID, chipType, and a click event that will trigger
export interface Props {
    id: string;
    chipType?: string;
    onClick: (id: string) => any;
}