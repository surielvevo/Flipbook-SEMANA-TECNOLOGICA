'use client';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { scheduleData } from '../data/schedule';

const styles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#FFFFFF', position: 'relative' },
  logoHeader: { width: 200, position: 'absolute', top: 30, right: 30 },
  content: { marginTop: 70 },
  title: { fontSize: 24, color: '#0033A0', fontWeight: 'bold', marginBottom: 20 },
  dayContainer: { marginBottom: 15 },
  dateHeader: { fontSize: 12, backgroundColor: '#0033A0', color: '#FFFFFF', padding: 5, fontWeight: 'bold', marginBottom: 8 },
  eventRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#EEE', paddingVertical: 6 },
  time: { width: '25%', fontSize: 9, fontWeight: 'bold' },
  info: { width: '75%', fontSize: 9 }
});

export const ProgramPDF = () => (
  <Document title="Programa Semana Tecnologica 2026">
    {scheduleData.map((day, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Image src="/logo-institucional.png" style={styles.logoHeader} />
        <View style={styles.content}>
          {index === 0 && <Text style={styles.title}>PROGRAMA SEMANA TECNOLÓGICA</Text>}
          <View style={styles.dayContainer}>
            <Text style={styles.dateHeader}>{day.date}</Text>
            {day.events.map((e, j) => (
              <View key={j} style={styles.eventRow} wrap={false}>
                <Text style={styles.time}>{e.time}</Text>
                <View style={styles.info}>
                  <Text style={{ fontWeight: 'bold' }}>{e.title}</Text>
                  <Text style={{ color: '#555' }}>{e.speaker} | {e.room}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);
