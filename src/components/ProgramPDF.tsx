'use client';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { scheduleData } from '../data/schedule';

const styles = StyleSheet.create({
  page: { padding: 50, backgroundColor: '#FFFFFF', position: 'relative' },
  logoHeader: { width: 200, position: 'absolute', top: 30, right: 30 },
  content: { marginTop: 70 },
  title: { fontSize: 22, color: '#0033A0', fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 10, color: '#555555', marginBottom: 20 },
  dayContainer: { marginBottom: 15 },
  dateHeader: {
    fontSize: 11,
    color: '#0033A0',
    fontWeight: 'bold',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD100',
    paddingLeft: 8,
    paddingVertical: 4,
    marginBottom: 8,
    backgroundColor: '#F0F4FF',
  },
  eventRow: { flexDirection: 'row', borderBottomWidth: 0.5, borderBottomColor: '#EEE', paddingVertical: 6 },
  time: { width: '25%', fontSize: 9, fontWeight: 'bold', color: '#0033A0' },
  info: { width: '75%', fontSize: 9 },
});

export const ProgramPDF = () => (
  <Document title="Semana Tecnológica FIA 2026">
    {scheduleData.map((day, index) => (
      <Page key={index} size="A4" style={styles.page}>
        <Image src="/logo-institucional.png" style={styles.logoHeader} />
        <View style={styles.content}>
          {index === 0 && (
            <>
              <Text style={styles.title}>SEMANA TECNOLÓGICA FIA 2026</Text>
              <Text style={styles.subtitle}>Facultad de Ingeniería y Arquitectura — UASD · 24 al 27 de marzo</Text>
            </>
          )}
          <View style={styles.dayContainer}>
            <Text style={styles.dateHeader}>{day.date}</Text>
            {day.events.map((e, j) => (
              <View key={j} style={styles.eventRow} wrap={false}>
                <Text style={styles.time}>{e.time}</Text>
                <View style={styles.info}>
                  <Text style={{ fontWeight: 'bold' }}>{e.title}</Text>
                  <Text style={{ color: '#555' }}>{e.speaker} · {e.room}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </Page>
    ))}
  </Document>
);
