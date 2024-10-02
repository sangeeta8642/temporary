import { ChromePicker, CirclePicker } from 'react-color'

import { COLORS } from '../type'
import { rgbaObjectToString } from '../utils'

interface ColorPickerProps {
    value: string,
    onChange: (value: string) => void
}

export const ColorPicker = ({
    value,
    onChange
}: ColorPickerProps) => {
    return (
        <div className='w-full space-y-4'>
            <ChromePicker
                color={value}
                onChange={(color: { rgb: any }) => {
                    const formattedValue = rgbaObjectToString(color.rgb)
                    onChange(formattedValue)
                }}
                className='border rounded-lg'
            />
            <CirclePicker
                color={value}
                colors={COLORS}
                onChangeComplete={(color: { rgb: any }) => {
                    const formattedValue = rgbaObjectToString(color.rgb)
                    onChange(formattedValue)
                }}
            />
        </div>
    )
}