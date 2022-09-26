export enum Color {
    BLUE = 'BLUE',
    DARK_BLUE = 'DARK_BLUE',
    VIOLET = 'VIOLET',
    GREEN = 'GREEN',
    ORANGE = 'ORANGE',
    RED = 'RED',
    YELLOW = 'YELLOW',
    BLACK = 'BLACK',
    GREY = 'GREY',

}

export interface TagInterface {
    id: Color | null;
    color: string;
    selectedColor: string;
    label: string;
}

export class Tags {

    public static tagStructure: any = {
        ORANGE: { color: '#F27200', selectedColor: '#F27200', label: 'Оранжевый'},
        YELLOW: { color: '#FDAD00', selectedColor: '#FDAD00', label: 'Желтый'},
        RED: { color: '#BE0001', selectedColor: '#BE0001', label: 'Красный'},
        VIOLET: { color: '#834190', selectedColor: '#834190', label: 'Фиолетовый' },
        DARK_BLUE: { color: '#2B4D96', selectedColor: '#2B4D96', label: 'Синий'},
        BLUE: { color: '#00A2FF', selectedColor: '#00A2FF', label: 'Голубой',},
        GREEN: { color: '#7BA05B', selectedColor: '#7BA05B', label: 'Зелёный',},
        GREY: { color: '#92929D', selectedColor: '#92929D', label: 'Серый',},
        BLACK: { color: '#252F32', selectedColor: '#252F32', label: 'Черный',},

    };

    public static tagArray: TagInterface[] = [
        { id: Color.ORANGE, color: Tags.tagStructure.ORANGE.color, selectedColor: '#5197ca', label: 'Оранжевый'},
        { id: Color.YELLOW, color: Tags.tagStructure.YELLOW.color, selectedColor: '#5197ca', label: 'Желтый'},
        { id: Color.RED, color: Tags.tagStructure.RED.color, selectedColor: '#b274ca', label: 'Красный'},
        { id: Color.VIOLET, color: Tags.tagStructure.VIOLET.color, selectedColor: '#c2b31b', label: 'Фиолетовый'},
        { id: Color.DARK_BLUE, color: Tags.tagStructure.DARK_BLUE.color, selectedColor: '#cc8a14', label: 'Синий'},
        { id: Color.BLUE, color: Tags.tagStructure.BLUE.color, selectedColor: '#cb494c', label: 'Голубой'},
        { id: Color.GREEN, color: Tags.tagStructure.GREEN.color, selectedColor: '#82ae10', label: 'Зелёный'},
        { id: Color.GREY, color: Tags.tagStructure.GREY.color, selectedColor: '#82ae10', label: 'Серый'},
        { id: Color.BLACK, color: Tags.tagStructure.BLACK.color, selectedColor: '#82ae10', label: 'Черный'},
        ];


}
