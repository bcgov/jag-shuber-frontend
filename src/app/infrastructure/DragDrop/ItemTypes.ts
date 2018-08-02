interface ItemTypeName {
    ASSIGNMENT: 'SheriffAssignment';
    SHERIFF: 'Sheriff';
    SHERIFF_DUTY: 'SheriffDuty';
}

export type ItemType = ItemTypeName[keyof (ItemTypeName)];