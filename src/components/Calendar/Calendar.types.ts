import {useAvailableDates} from '../../api/useAvailableDates';

export type Props = { disabled?: boolean };
export type BlockParams = {
    dates: ReturnType<typeof useAvailableDates>['result'], buttonsCount: number, disabled?: boolean
};
