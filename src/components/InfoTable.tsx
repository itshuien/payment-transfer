import { StyleSheet, Text, View } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface InfoTableRowProps {
    label: string;
    value: string;
}

export const InfoTableRow: React.FC<InfoTableRowProps> = (props) => {
    const { label, value } = props;

    return (
        <View style={styles.row}>
            <Text style={styles.rowLabel}>{label}</Text>
            <Text style={styles.rowValue}>{value}</Text>
        </View>
    );
}

const InfoTable: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return (
        <View style={styles.container}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 16,
    },
    rowLabel: {
        flexGrow: 1,
        flexShrink: 0,
        fontSize: 16,
        color: '#888',
    },
    rowValue: {
        flexShrink: 1,
        fontSize: 16,
        fontWeight: 500,
        textAlign: 'right',
    },
});

export default InfoTable;
