// components/ListeningResultPDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, fontFamily: 'Helvetica' },
  section: { marginBottom: 10 },
  heading: { fontSize: 20, marginBottom: 10 },
  row: { flexDirection: 'row', borderBottom: 1, padding: 4 },
  cellHeader: { width: '50%', fontWeight: 'bold' },
  cell: { width: '50%' },
});

const ListeningResultPDF = ({ userName, sectionScores, totalScore, totalQuestions }) => {
  const percentage = ((totalScore / totalQuestions) * 100).toFixed(2);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>Listening Test Results</Text>
          <Text>Name: {userName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={{ fontWeight: 'bold' }}>Your Result -</Text>
          <View style={styles.row}>
            <Text style={styles.cellHeader}>Section</Text>
            <Text style={styles.cellHeader}>Score</Text>
          </View>
          {Object.entries(sectionScores).map(([key, score], i) => (
            <View key={key} style={styles.row}>
              <Text style={styles.cell}>Listening Section {i + 1}</Text>
              <Text style={styles.cell}>{score}/10</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text>Score: {totalScore} out of {totalQuestions}</Text>
          <Text>Percentage: {percentage}%</Text>
        </View>
      </Page>
    </Document>
  );
};

export default ListeningResultPDF;
