import { Confirmation, IStageCode } from '../../../models/entity/contact';
import { AddressBlock } from '../address-block';

export class Deal {
    id?: string;
    accountId?: string;
    addDate: Date;
    changeDate?: Date;
    closeDate?: Date;
    readyDate?: Date;
    sources: any;
    responsible: any;
    stage: keyof typeof Deal.stageOptions;
    type: keyof typeof Deal.typeOptions;
    propertyType: keyof typeof Deal.propertyTypeOptions;
    residential–°omplex: string;
    houseTypes: string[];
    objectType: keyof typeof Deal.objectTypeOptions;
    propertyRight: keyof typeof Deal.propertyRightOptions;
    propertyStatuses: any[];
    cadastralNumber?: string;
    encumbrance: string;
    titleDeeds: string;
    addressBlock: AddressBlock;
    address: string;
    apartment: string | null;
    entrance: string | null;
    floor: string | null;
    constructionStage: string;
    tag: string[];
    description: string;
    location: any;
    permittedUses: string[];
    heading: string;
    qualification: keyof typeof Deal.qualificationOptions;

    constructor() {
        this.tag = [];
        this.addDate = new Date();
        this.addressBlock = new AddressBlock();
        this.description = '';
        this.stage = 'CLIENT_POTENTIAL';
        // this.state = 'ATTRACTED';
        this.type = 'PURCHASE';
        this.propertyType = 'LIVING';
        this.residential–°omplex = '';
        this.cadastralNumber = ''
        this.objectType = 'FLAT';
        this.houseTypes = ['APARTMENT'];
        this.propertyStatuses = [];
        this.constructionStage = 'COMPLETED';
        this.propertyRight = 'INDIVIDUAL';
        this.sources = {};
        this.responsible = [];
        this.encumbrance = '';
        this.titleDeeds = '';
        this.permittedUses = [];
        this.heading = '';
        this.location = {lat: null, lon: null};
        this.qualification = 'NOT';
        this.address = '';
        this.apartment = null;
        this.floor = null;
        this.entrance = null;
    }

    public static stateOptions = {
        ATTRACTED: '–ü—Ä–ł–≤–Ľ–Ķ—á–Ķ–Ĺ–Ĺ—č–Ķ',
        IN_PROGRESS: '–í —Ä–į–Ī–ĺ—ā–Ķ',
        SUSPENDED: '–ü—Ä–ł–ĺ—Ā—ā–į–Ĺ–ĺ–≤–Ľ–Ķ–Ĺ–ĺ',
        ARCHIVE: '–ź—Ä—Ö–ł–≤'
    };

    public static stageOptions = {
        // –ü–†–ė–í–õ–ē–ß–ē–Ě–Ě–ę–ē
        CLIENT_POTENTIAL: {label: '–ü–ĺ—ā–Ķ–Ĺ—Ü–ł–į–Ľ—Ć–Ĺ—č–Ļ –ļ–Ľ–ł–Ķ–Ĺ—ā'},
        DEAL_POTENTIAL: {label: '–ü–ĺ—ā–Ķ–Ĺ—Ü–ł–į–Ľ—Ć–Ĺ–į—Ź —Ā–ī–Ķ–Ľ–ļ–į'},
        INITIAL_CONTACT: {label: '–ü–Ķ—Ä–≤–ł—á–Ĺ—č–Ļ –ļ–ĺ–Ĺ—ā–į–ļ—ā / –ó–Ĺ–į–ļ–ĺ–ľ—Ā—ā–≤–ĺ'},
        DEAL_CONVERSION: {label: '–ü—Ä–Ķ–ĺ–Ī—Ä–į–∑–ĺ–≤–į–Ĺ–ł–Ķ —Ā–ī–Ķ–Ľ–ļ–ł'},
        // –í –†–ź–Ď–ě–Ę–ē
        DEAL_NEW: {label: '–Ě–ĺ–≤–į—Ź —Ā–ī–Ķ–Ľ–ļ–į'},
        ADVERTISING_COMPANY: {label: '–†–Ķ–ļ–Ľ–į–ľ–Ĺ–į—Ź –ļ–ĺ–ľ–Ņ–į–Ĺ–ł—Ź'},
        FOUND_CUSTOMER: {label: '–Ě–į–Ļ–ī–Ķ–Ĺ –Ņ–ĺ–ļ—É–Ņ–į—ā–Ķ–Ľ—Ć'},
        FOUND_TENANT: {label: '–Ě–į–Ļ–ī–Ķ–Ĺ –į—Ä–Ķ–Ĺ–ī–į—ā–ĺ—Ä'},
        SELECTION_CHOICES: {label: '–ü–ĺ–ī–Ī–ĺ—Ä –≤–į—Ä–ł–į–Ĺ—ā–ĺ–≤'},
        CLIENT_AGREE_BUY: {label: '–ö–Ľ–ł–Ķ–Ĺ—ā –Ņ—Ä–ł–Ĺ—Ź–Ľ —Ä–Ķ—ą–Ķ–Ĺ–ł–Ķ –ļ—É–Ņ–ł—ā—Ć'},
        CLIENT_AGREE_RENT: {label: '–ö–Ľ–ł–Ķ–Ĺ—ā –Ņ—Ä–ł–Ĺ—Ź–Ľ —Ä–Ķ—ą–Ķ–Ĺ–ł–Ķ –į—Ä–Ķ–Ĺ–ī–ĺ–≤–į—ā—Ć'},
        AGREEMENT_CLOSING: {label: '–°–ĺ–≥–Ľ–į—Ā–ĺ–≤–į–Ĺ–ł–Ķ –∑–į–ļ—Ä—č—ā–ł—Ź —Ā–ī–Ķ–Ľ–ļ–ł'},
        DEAL_CLOSING: {label: '–ó–į–ļ—Ä—č—ā–ł–Ķ —Ā–ī–Ķ–Ľ–ļ–ł'},
//     –ü–†–ė–ě–°–Ę–ź–Ě–ě–í–õ–ē–Ě–Ě–ě                                         –í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć
        ONE_WEEK: {label: '–ě–ī–Ĺ–į –Ĺ–Ķ–ī–Ķ–Ľ—Ź'},
        TWO_WEEK: {label: '–Ē–≤–Ķ –Ĺ–Ķ–ī–Ķ–Ľ–ł'},
        THREE_WEEK: {label: '–Ę—Ä–ł –Ĺ–Ķ–ī–Ķ–Ľ–ł'},
        ONE_MONTH: {label: '–ú–Ķ—Ā—Ź—Ü'},
        TWO_MONTH: {label: '–Ē–≤–į –ľ–Ķ—Ā—Ź—Ü–į'},
        THREE_MONTH: {label: '–Ę—Ä–ł –ľ–Ķ—Ā—Ź—Ü–į'},
        SIX_MONTH: {label: '–®–Ķ—Ā—ā—Ć –ľ–Ķ—Ā—Ź—Ü–Ķ–≤'},
        ONE_YEAR: {label: '–ď–ĺ–ī'},
        CUSTOM: {label: '–Ē—Ä—É–≥–ĺ–Ķ'},
//     –ź–†–•–ė–í
        INVALID: {label: '–Ě–Ķ–≤–į–Ľ–ł–ī–Ĺ–į—Ź —Ā–ī–Ķ–Ľ–ļ–į'},
        DEAL_DISQUALIFIED: {label: '–Ē–ł—Ā–ļ–≤–į–Ľ–ł—Ą–ł—Ü–ł—Ä–ĺ–≤–į–Ĺ–į'},
        CLIENT_REJECTION: {label: '–ě—ā–ļ–į–∑ –ļ–Ľ–ł–Ķ–Ĺ—ā–į'},
        LOST: {label: '–ó–į–ļ—Ä—č—ā–į - –ü–ĺ—ā–Ķ—Ä—Ź–Ĺ–į'},
        SUCCESS: {label: '–ó–į–ļ—Ä—č—ā–į - –£—Ā–Ņ–Ķ—ą–Ĺ–ĺ'},
        BUCKET: {label: '–ö–ĺ—Ä–∑–ł–Ĺ–į'}
    }

    public static typeOptions = {
        PURCHASE: { label: '–ü–ĺ–ļ—É–Ņ–ļ–į', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: Deal.stageOptions.CLIENT_AGREE_BUY.label, code: "CLIENT_AGREE_BUY"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "–í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        SALE: { label: '–ü—Ä–ĺ–ī–į–∂–į', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "–í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        ALTERNATIVE: { label: '–ź–Ľ—Ć—ā–Ķ—Ä–Ĺ–į—ā–ł–≤–į', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_CUSTOMER.label, code: "FOUND_CUSTOMER"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "–í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        LEASE: { label: '–ź—Ä–Ķ–Ĺ–ī–į —Ā–ī–į—ā—Ć', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.DEAL_POTENTIAL.label, code: "DEAL_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.ADVERTISING_COMPANY.label, code: "ADVERTISING_COMPANY"},
                        {label: Deal.stageOptions.FOUND_TENANT.label, code: "FOUND_TENANT"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "–í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]},
        RENT: { label: '–ź—Ä–Ķ–Ĺ–ī–į —Ā–Ĺ—Ź—ā—Ć', stages: [
                {
                    label: Deal.stateOptions.ATTRACTED, value: "ATTRACTED",
                    items: [
                        {label: Deal.stageOptions.CLIENT_POTENTIAL.label, code: "CLIENT_POTENTIAL"},
                        {label: Deal.stageOptions.INITIAL_CONTACT.label, code: "INITIAL_CONTACT"},
                        {label: Deal.stageOptions.DEAL_CONVERSION.label, code: "DEAL_CONVERSION"},
                    ]
                },
                {
                    label: Deal.stateOptions.IN_PROGRESS, value: 'IN_PROGRESS',
                    items: [
                        {label: Deal.stageOptions.DEAL_NEW.label, code: "DEAL_NEW"},
                        {label: Deal.stageOptions.SELECTION_CHOICES.label, code: "SELECTION_CHOICES"},
                        {label: Deal.stageOptions.CLIENT_AGREE_RENT.label, code: "CLIENT_AGREE_RENT"},
                        {label: Deal.stageOptions.AGREEMENT_CLOSING.label, code: "AGREEMENT_CLOSING"},
                        {label: Deal.stageOptions.DEAL_CLOSING.label, code: "DEAL_CLOSING"},
                    ]
                },
                {
                    label: Deal.stateOptions.SUSPENDED, value: 'SUSPENDED', action: "–í–ĺ—Ā—Ā—ā–į–Ĺ–ĺ–≤–ł—ā—Ć",
                    items: [
                        {label: Deal.stageOptions.ONE_WEEK.label, code: "ONE_WEEK"},
                        {label: Deal.stageOptions.TWO_WEEK.label, code: "TWO_WEEK"},
                        {label: Deal.stageOptions.THREE_WEEK.label, code: "THREE_WEEK"},
                        {label: Deal.stageOptions.ONE_MONTH.label, code: "ONE_MONTH"},
                        {label: Deal.stageOptions.TWO_MONTH.label, code: "TWO_MONTH"},
                        {label: Deal.stageOptions.THREE_MONTH.label, code: "THREE_MONTH"},
                        {label: Deal.stageOptions.SIX_MONTH.label, code: "SIX_MONTH"},
                        {label: Deal.stageOptions.ONE_YEAR.label, code: "ONE_YEAR"},
                        {label: Deal.stageOptions.CUSTOM.label, code: "CUSTOM"},
                    ]
                },
                {
                    label: Deal.stateOptions.ARCHIVE, value: 'ARCHIVE',
                    items: [
                        {label: Deal.stageOptions.INVALID.label, code: "INVALID"},
                        {label: Deal.stageOptions.DEAL_DISQUALIFIED.label, code: "DEAL_DISQUALIFIED"},
                        {label: Deal.stageOptions.CLIENT_REJECTION.label, code: "CLIENT_REJECTION"},
                        {label: Deal.stageOptions.LOST.label, code: "LOST"},
                        {label: Deal.stageOptions.SUCCESS.label, code: "SUCCESS"},
                        {label: Deal.stageOptions.BUCKET.label, code: "BUCKET"}
                    ]
                },
            ]}
    };

    public static typeArray = [
        {label: Deal.typeOptions.PURCHASE.label, code: 'PURCHASE'},
        {label: Deal.typeOptions.SALE.label, code: 'SALE'},
        {label: Deal.typeOptions.ALTERNATIVE.label, code: 'ALTERNATIVE'},
        {label: Deal.typeOptions.LEASE.label, code: 'LEASE'},
        {label: Deal.typeOptions.RENT.label, code: 'RENT'}
    ];

    public static propertyStatusOptions = {
        NEW: {label: '–ü–Ķ—Ä–≤–ł—á–Ĺ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć'},
        OLD: {label: '–í—ā–ĺ—Ä–ł—á–Ĺ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć'},
        UNFINISHED: {label: '–ě–Ī—ä–Ķ–ļ—ā –Ĺ–Ķ–∑–į–≤–Ķ—Ä—ą–Ķ–Ĺ–Ĺ–ĺ–≥–ĺ —Ā—ā—Ä-–≤–į'},
        ACCOUNTED: {label: '–£—á—ā–Ķ–Ĺ–Ĺ—č–Ļ' },
        PREVIOUSLY: {label: '–†–į–Ĺ–Ķ–Ķ —É—á—ā–Ķ–Ĺ–Ĺ—č–Ļ' },
        ARCHIVED: {label: '–ź—Ä—Ö–ł–≤–Ĺ—č–Ļ' }
    };

    public static houseTypeOptions = {
        INDIVIDUAL_BUILDING: {label: '–ė–Ĺ–ī–ł–≤–ł–ī—É–į–Ľ—Ć–Ĺ—č–Ļ –∂–ł–Ľ–ĺ–Ļ –ī–ĺ–ľ'},
        GARDEN_BUILDING: {label: '–°–į–ī–ĺ–≤—č–Ļ –ī–ĺ–ľ'},
        BARRACK: {label: '–Ď–į—Ä–į–ļ'},
        TOWNHOUSE: {label: '–Ę–į—É–Ĺ—Ö–į—É—Ā'},
        DUPLEX: {label: '–Ē—É–Ņ–Ľ–Ķ–ļ—Ā'},
        FLAT: {label: '–ö–≤–į—Ä—ā–ł—Ä–į'},
        APARTMENT: {label: '–Ė–ł–Ľ–ĺ–Ļ –ľ–Ĺ–ĺ–≥–ĺ–ļ–≤–į—Ä—ā–ł—Ä–Ĺ—č–Ļ –ī–ĺ–ľ', longLabel: '–ú–Ĺ–ĺ–≥–ĺ–ļ–≤–į—Ä—ā–ł—Ä–Ĺ—č–Ļ –ī–ĺ–ľ'},
        SMALL_FAMILY: {label: '–Ė–ł–Ľ–ĺ–Ļ –ī–ĺ–ľ –ľ–į–Ľ–ĺ—Ā–Ķ–ľ–Ķ–Ļ–Ĺ–ĺ–≥–ĺ —ā–ł–Ņ–į', longLabel: '–ú–į–Ľ–ĺ—Ā–Ķ–ľ–Ķ–Ļ–Ĺ—č–Ļ –ī–ĺ–ľ'},
        GOSTINKA: {label: '–Ė–ł–Ľ–ĺ–Ļ –ī–ĺ–ľ –≥–ĺ—Ā—ā–ł–Ĺ–ł—á–Ĺ–ĺ–≥–ĺ —ā–ł–Ņ–į', longLabel: '–ď–ĺ—Ā—ā–ł–Ĺ–ł—á–Ĺ—č–Ļ –ī–ĺ–ľ'},
        DORMITORY: {label: '–ě–Ī—Č–Ķ–∂–ł—ā–ł–Ķ'},

        APART_HOTEL: {label: '–ź–Ņ–į—Ä—ā-–ě—ā–Ķ–Ľ—Ć'},
        LIVING_HOUSE: {label: '–Ė–ł–Ľ–ĺ–Ļ –ī–ĺ–ľ'},
        MOLL: {label: '–Ę–ĺ—Ä–≥–ĺ–≤–ĺ-—Ä–į–∑–≤–Ľ–Ķ–ļ–į—ā–Ķ–Ľ—Ć–Ĺ—č–Ļ —Ü–Ķ–Ĺ—ā—Ä'},
        SHOPPING_CENTER: {label: '–Ę–ĺ—Ä–≥–ĺ–≤—č–Ļ —Ü–Ķ–Ĺ—ā—Ä'},
        BUSINESS_CENTER: {label: '–Ď–ł–∑–Ĺ–Ķ—Ā —Ü–Ķ–Ĺ—ā—Ä'},
        OFFICE_BUILDING: {label: '–ě—Ą–ł—Ā–Ĺ–ĺ–Ķ –∑–ī–į–Ĺ–ł–Ķ'},
        MULTIFUNCTIONAL_CENTER: {label: '–ú–Ĺ–ĺ–≥–ĺ—Ą—É–Ĺ–ļ—Ü–ł–ĺ–Ĺ–į–Ľ—Ć–Ĺ—č–Ļ —Ü–Ķ–Ĺ—ā—Ä'},
        WAREHOUSE: {label: '–°–ļ–Ľ–į–ī—Ā–ļ–ĺ–Ļ –ļ–ĺ–ľ–Ņ–Ľ–Ķ–ļ—Ā'},
        PRODUCTION_BUILDING: {label: '–ü—Ä–ĺ–ł–∑–≤–ĺ–ī—Ā—ā–≤–Ķ–Ĺ–Ĺ–ĺ–Ķ –∑–ī–į–Ĺ–ł–Ķ'},

        AGRICULTURAL_LANDS: {label: '–ó–Ķ–ľ–Ľ–ł —Ā–Ķ–Ľ—Ć—Ö–ĺ–∑–Ĺ–į–∑–Ĺ–į—á–Ķ–Ĺ–ł—Ź'},
        SETTLEMENT_LANDS: {label: '–ó–Ķ–ľ–Ľ–ł –Ĺ–į—Ā–Ķ–Ľ–Ķ–Ĺ–Ĺ—č—Ö –Ņ—É–Ĺ–ļ—ā–ĺ–≤'},
        INDUSTRY_LANDS: {label: '–ó–Ķ–ľ–Ľ–ł –Ņ—Ä–ĺ–ľ—č—ą–Ľ–Ķ–Ĺ–Ĺ–ĺ—Ā—ā–ł'}

    };

    public static objectTypeOptions = {
        PART_APARTMENT: { label: '–ß–į—Ā—ā—Ć –ļ–≤–į—Ä—ā–ł—Ä—č'},
        PART_HOUSE: { label: '–ß–į—Ā—ā—Ć –ł–Ĺ–ī–ł–≤–ł–ī—É–į–Ľ—Ć–Ĺ–ĺ–≥–ĺ –∂–ł–Ľ–ĺ–≥–ĺ –ī–ĺ–ľ–į'},
        ROOM: { label:  '–ö–ĺ–ľ–Ĺ–į—ā–į'},
        FLAT: { label: '–ö–≤–į—Ä—ā–ł—Ä–į'},
        HOUSE: { label: '–ė–Ĺ–ī–ł–≤–ł–ī—É–Ľ—Ć–Ĺ—č–Ļ –∂–ł–Ľ–ĺ–Ļ –ī–ĺ–ľ'},
        GARDEN_HOUSE: { label: '–°–į–ī–ĺ–≤—č–Ļ –ī–ĺ–ľ'},
        STUDIO: { label: '–°—ā—É–ī–ł—Ź'},

        APARTMENT: { label: '–ź–Ņ–į—Ä—ā–į–ľ–Ķ–Ĺ—ā—č'},
        PARKING_PLACE: { label: '–ú–į—ą–ł–Ĺ–ĺ–ľ–Ķ—Ā—ā–ĺ'},
        OFFICE: { label: '–ě—Ą–ł—Ā'},
        STOREHOUSE: { label: '–ö–Ľ–į–ī–ĺ–≤–ļ–į'},
        STORAGE: { label: '–°–ļ–Ľ–į–ī'},
        RETAIL_SPACE: { label: '–Ę–ĺ—Ä–≥–ĺ–≤–ĺ–Ķ –Ņ–ĺ–ľ–Ķ—Č–Ķ–Ĺ–ł–Ķ'},
        FREE_SPACE: { label: '–ü–ĺ–ľ–Ķ—Č–Ķ–Ĺ–ł–Ķ —Ā–≤–ĺ–Ī–ĺ–ī–Ĺ–ĺ–≥–ĺ –Ĺ–į–∑–Ĺ–į—á–Ķ–Ĺ–ł—Ź'},

        PAVILION: { label: '–ü–į–≤–ł–Ľ—Ć–ĺ–Ĺ'},
        WORK_PLACE: { label: '–†–į–Ī–ĺ—á–ł–Ļ —É—á–į—Ā—ā–ĺ–ļ'},
        GILD: { label: '–¶–Ķ—Ö'},

        GARDEN_LAND: { label: '–°–į–ī–ĺ–≤—č–Ļ –∑–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ'},
        VEGETABLE_LAND: { label: '–ě–≥–ĺ—Ä–ĺ–ī–Ĺ—č–Ļ –∑–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ'},
        FIELD_LAND: { label: '–ü–ĺ–Ľ–Ķ–≤–ĺ–Ļ –∑–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ'},
        HOMESTEAD_LAND: { label: '–ü—Ä–ł—É—Ā–į–ī–Ķ–Ī–Ĺ—č–Ļ –∑–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ'},
        INDUSTRIAL_SITE: { label: '–ó–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ –Ņ—Ä–ĺ–ľ–Ĺ–į–∑–Ĺ–į—á–Ķ–Ĺ–ł—Ź'},
        HOME_LAND: { label: '–ü—Ä–ł–ī–ĺ–ľ–ĺ–≤–ĺ–Ļ –∑–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ'}
    };

    public static propertyTypes = [
        {label: '–Ė–ł–Ľ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć', value: "LIVING", items: [
                {label: Deal.objectTypeOptions.ROOM.label, code: 'ROOM'},
                {label: Deal.objectTypeOptions.FLAT.label, code: 'FLAT'},
                {label: Deal.objectTypeOptions.GARDEN_HOUSE.label, code: 'GARDEN_HOUSE'},
                {label: Deal.objectTypeOptions.HOUSE.label, code: 'HOUSE'},
                {label: Deal.objectTypeOptions.PART_APARTMENT.label, code: 'PART_APARTMENT'},
                {label: Deal.objectTypeOptions.PART_HOUSE.label, code: 'PART_HOUSE'}
            ]},
        {label: '–ö–ĺ–ľ–ľ–Ķ—Ä—á–Ķ—Ā–ļ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć',  value: "COMMERCIAL", items: [
                {label: Deal.objectTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.objectTypeOptions.PARKING_PLACE.label, code: 'PARKING_PLACE'},
                {label: Deal.objectTypeOptions.OFFICE.label, code: 'OFFICE'},
                {label: Deal.objectTypeOptions.STOREHOUSE.label, code: 'STOREHOUSE'},
                {label: Deal.objectTypeOptions.STORAGE.label, code: 'STORAGE'},
                {label: Deal.objectTypeOptions.RETAIL_SPACE.label, code: 'RETAIL_SPACE'},
                {label: Deal.objectTypeOptions.FREE_SPACE.label, code: 'FREE_SPACE'},
                {label: Deal.objectTypeOptions.PAVILION.label, code: 'PAVILION'},
                {label: Deal.objectTypeOptions.WORK_PLACE.label, code: 'WORK_PLACE'},
                {label: Deal.objectTypeOptions.GILD.label, code: 'GILD'}
            ]},
        {label: '–ó–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ', value: "LAND", items: [
                {label: Deal.objectTypeOptions.GARDEN_LAND.label, code: 'GARDEN_LAND'},
                {label: Deal.objectTypeOptions.VEGETABLE_LAND.label, code: 'VEGETABLE_LAND'},
                {label: Deal.objectTypeOptions.FIELD_LAND.label, code: 'FIELD_LAND'},
                {label: Deal.objectTypeOptions.HOMESTEAD_LAND.label, code: 'HOMESTEAD_LAND'},
                {label: Deal.objectTypeOptions.INDUSTRIAL_SITE.label, code: 'INDUSTRIAL_SITE'},
                {label: Deal.objectTypeOptions.HOME_LAND.label, code: 'HOME_LAND'}
            ]},
    ];

    public static propertyTypeOptions = {
        LIVING: {label: '–Ė–ł–Ľ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć', objectTypes: [
                {label: Deal.objectTypeOptions.ROOM.label, code: 'ROOM', houseTypes: [
                        {label: Deal.houseTypeOptions.FLAT.label, code: 'FLAT'},
                        {label: Deal.houseTypeOptions.SMALL_FAMILY.label, code: 'SMALL_FAMILY'},
                        {label: Deal.houseTypeOptions.GOSTINKA.label, code: 'GOSTINKA'},
                        {label: Deal.houseTypeOptions.DORMITORY.label, code: 'DORMITORY'},
                        {label: Deal.houseTypeOptions.TOWNHOUSE.label, code: 'TOWNHOUSE'},
                        {label: Deal.houseTypeOptions.DUPLEX.label, code: 'DUPLEX'},
                        {label: Deal.houseTypeOptions.BARRACK.label, code: 'BARRACK'},
                        {label: Deal.houseTypeOptions.INDIVIDUAL_BUILDING.label, code: 'INDIVIDUAL_BUILDING'},
                        {label: Deal.houseTypeOptions.GARDEN_BUILDING.label, code: 'GARDEN_BUILDING'},
                    ]},
                {label: Deal.objectTypeOptions.FLAT.label, code: 'FLAT'},
                {label: Deal.objectTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.objectTypeOptions.GARDEN_HOUSE.label, code: 'GARDEN_HOUSE', houseTypes: []},
                {label: Deal.objectTypeOptions.HOUSE.label, code: 'HOUSE', houseTypes: []},
                {label: Deal.objectTypeOptions.PART_APARTMENT.label, code: 'PART_APARTMENT'},
                {label: Deal.objectTypeOptions.PART_HOUSE.label, code: 'PART_HOUSE', houseTypes: []},
            ], houseTypes: [
                {label: Deal.houseTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.houseTypeOptions.SMALL_FAMILY.label, code: 'SMALL_FAMILY'},
                {label: Deal.houseTypeOptions.GOSTINKA.label, code: 'GOSTINKA'},
                {label: Deal.houseTypeOptions.DORMITORY.label, code: 'DORMITORY'},
                {label: Deal.houseTypeOptions.TOWNHOUSE.label, code: 'TOWNHOUSE'},
                {label: Deal.houseTypeOptions.DUPLEX.label, code: 'DUPLEX'},
                {label: Deal.houseTypeOptions.BARRACK.label, code: 'BARRACK'}
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.NEW.label, code: 'NEW'},
                {label: Deal.propertyStatusOptions.OLD.label, code: 'OLD'},
                {label: Deal.propertyStatusOptions.UNFINISHED.label, code: 'UNFINISHED'}
            ]
        },
        COMMERCIAL: {label: '–ö–ĺ–ľ–ľ–Ķ—Ä—á–Ķ—Ā–ļ–į—Ź –Ĺ–Ķ–ī–≤–ł–∂–ł–ľ–ĺ—Ā—ā—Ć', objectTypes: [
                {label: Deal.objectTypeOptions.APARTMENT.label, code: 'APARTMENT'},
                {label: Deal.objectTypeOptions.PARKING_PLACE.label, code: 'PARKING_PLACE'},
                {label: Deal.objectTypeOptions.OFFICE.label, code: 'OFFICE'},
                {label: Deal.objectTypeOptions.STOREHOUSE.label, code: 'STOREHOUSE'},
                {label: Deal.objectTypeOptions.STORAGE.label, code: 'STORAGE'},
                {label: Deal.objectTypeOptions.RETAIL_SPACE.label, code: 'RETAIL_SPACE'},
                {label: Deal.objectTypeOptions.FREE_SPACE.label, code: 'FREE_SPACE'},
                {label: Deal.objectTypeOptions.PAVILION.label, code: 'PAVILION'},
                {label: Deal.objectTypeOptions.WORK_PLACE.label, code: 'WORK_PLACE'},
                {label: Deal.objectTypeOptions.GILD.label, code: 'GILD'}
            ], houseTypes: [
                {label: Deal.houseTypeOptions.APART_HOTEL.label, code: 'APART_HOTEL'},
                {label: Deal.houseTypeOptions.LIVING_HOUSE.label, code: 'LIVING_HOUSE'},
                {label: Deal.houseTypeOptions.MOLL.label, code: 'MOLL'},
                {label: Deal.houseTypeOptions.SHOPPING_CENTER.label, code: 'SHOPPING_CENTER'},
                {label: Deal.houseTypeOptions.BUSINESS_CENTER.label, code: 'BUSINESS_CENTER'},
                {label: Deal.houseTypeOptions.OFFICE_BUILDING.label, code: 'OFFICE_BUILDING'},
                {label: Deal.houseTypeOptions.MULTIFUNCTIONAL_CENTER.label, code: 'MULTIFUNCTIONAL_CENTER'},
                {label: Deal.houseTypeOptions.WAREHOUSE.label, code: 'WAREHOUSE'},
                {label: Deal.houseTypeOptions.PRODUCTION_BUILDING.label, code: 'PRODUCTION_BUILDING'}
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.NEW.label, code: 'NEW'},
                {label: Deal.propertyStatusOptions.OLD.label, code: 'OLD'},
                {label: Deal.propertyStatusOptions.UNFINISHED.label, code: 'UNFINISHED'}
            ]},
        LAND: {label: '–ó–Ķ–ľ–Ķ–Ľ—Ć–Ĺ—č–Ļ —É—á–į—Ā—ā–ĺ–ļ', objectTypes: [
                {label: Deal.objectTypeOptions.GARDEN_LAND.label, code: 'GARDEN_LAND'},
                {label: Deal.objectTypeOptions.VEGETABLE_LAND.label, code: 'VEGETABLE_LAND'},
                {label: Deal.objectTypeOptions.FIELD_LAND.label, code: 'FIELD_LAND'},
                {label: Deal.objectTypeOptions.HOMESTEAD_LAND.label, code: 'HOMESTEAD_LAND'},
                {label: Deal.objectTypeOptions.INDUSTRIAL_SITE.label, code: 'INDUSTRIAL_SITE'}
            ], houseTypes: [
                {label: Deal.houseTypeOptions.AGRICULTURAL_LANDS.label, code: 'INDUSTRIAL_SITE'},
                {label: Deal.houseTypeOptions.SETTLEMENT_LANDS.label, code: 'SETTLEMENT_LANDS'},
                {label: Deal.houseTypeOptions.INDUSTRY_LANDS.label, code: 'INDUSTRY_LANDS'},
            ], propertyStatuses: [
                {label: Deal.propertyStatusOptions.ACCOUNTED.label, code: 'ACCOUNTED'},
                {label: Deal.propertyStatusOptions.PREVIOUSLY.label, code: 'PREVIOUSLY'},
                {label: Deal.propertyStatusOptions.ARCHIVED.label, code: 'ARCHIVED'},
            ]
        }
    };

    public static propertyTypeArray = [
        {label: Deal.propertyTypeOptions.LIVING.label, code: 'LIVING'},
        {label: Deal.propertyTypeOptions.COMMERCIAL.label, code: 'COMMERCIAL'},
        {label: Deal.propertyTypeOptions.LAND.label, code: 'LAND'}
    ];

    public static propertyRightOptions = {
        INDIVIDUAL: '–ė–Ĺ–ī–ł–≤–ł–ī—É–į–Ľ—Ć–Ĺ–į—Ź —Ā–ĺ–Ī—Ā—ā–≤–Ķ–Ĺ–Ĺ–ĺ—Ā—ā—Ć',
        COMMON_SHARED: '–ě–Ī—Č–į—Ź –ī–ĺ–Ľ–Ķ–≤–į—Ź —Ā–ĺ–Ī—Ā—ā–≤–Ķ–Ĺ–Ĺ–ĺ—Ā—ā—Ć',
        COMMON_JOINT: '–ě–Ī—ą–į—Ź —Ā–ĺ–≤–ľ–Ķ—Ā—ā–Ĺ–į—Ź —Ā–ĺ–Ī—Ā—ā–≤–Ķ–Ĺ–Ĺ–ĺ—Ā—ā—Ć',
        OTHER: '–Ē—Ä—É–≥–ĺ–Ķ'
    };

    public static propertyRightArray = [
        {label: Deal.propertyRightOptions.INDIVIDUAL, code: 'INDIVIDUAL'},
        {label: Deal.propertyRightOptions.COMMON_SHARED, code: 'COMMON_SHARED'},
        {label: Deal.propertyRightOptions.COMMON_JOINT, code: 'COMMON_JOINT'},
        {label: Deal.propertyRightOptions.OTHER, code: 'OTHER'}
    ];

    public static qualificationOptions = {
        NOT: '–Ě–Ķ –ļ–≤–į–Ľ–ł—Ą–ł—Ü–ł—Ä–ĺ–≤–į–Ĺ–ĺ',
        OTHER: '–Ē—Ä—É–≥–ĺ–Ķ'
    };

    public static qualificationArray = [
        {label: Deal.qualificationOptions.NOT, code: 'NOT'},
        {label: Deal.qualificationOptions.OTHER, code: 'OTHER'},
    ];
}
