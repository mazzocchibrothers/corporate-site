'use client';

import { Document, Page, View, Text, Image, Link, Svg, Defs, LinearGradient, Stop, Rect, Font, StyleSheet, pdf } from '@react-pdf/renderer';
import type { reportContent } from './model';

Font.register({ family: 'Mona Sans Report', fonts: [
  { src: '/fonts/mona-sans-regular.ttf', fontWeight: 400 },
  { src: '/fonts/mona-sans-semibold.ttf', fontWeight: 600 },
] });
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: { fontFamily: 'Mona Sans Report', fontSize: 10, color: '#14181f', paddingHorizontal: 45, paddingTop: 31, paddingBottom: 34 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 25 },
  logo: { width: 92, height: 25, objectFit: 'contain' },
  pill: { maxWidth: 270, fontSize: 8, letterSpacing: 1, textTransform: 'uppercase', color: '#4b4df7', border: '1 solid #d9daff', borderRadius: 15, paddingVertical: 5, paddingHorizontal: 12 },
  title: { fontSize: 25, fontWeight: 600, lineHeight: 1.1, marginTop: 24, marginBottom: 5 },
  meta: { fontSize: 9, color: '#9a9a9a' },
  metrics: { flexDirection: 'row', justifyContent: 'space-between', gap: 14, marginTop: 23, backgroundColor: '#f6f7ff', border: '1 solid #e1e2ff', borderRadius: 12, padding: 22 },
  metric: { flexShrink: 1 },
  metricLabel: { fontSize: 8, color: '#6b7280', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8 },
  metricValue: { fontSize: 23, fontWeight: 600 },
  mainValue: { fontSize: 30, color: '#4b4df7', fontWeight: 600 },
  columns: { flexDirection: 'row', gap: 28, marginTop: 24 },
  column: { flex: 1 },
  heading: { color: '#4b4df7', fontSize: 8.5, textTransform: 'uppercase', letterSpacing: 0.6, fontWeight: 600, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', gap: 8, paddingVertical: 8, borderBottom: '1 solid #eef0f2' },
  rowLabel: { color: '#555555', flexShrink: 1, lineHeight: 1.4 },
  rowValue: { fontWeight: 600, flexShrink: 0 },
  driverValue: { color: '#4b4df7', fontWeight: 600, flexShrink: 0 },
  section: { marginTop: 24 },
  assumptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 16 },
  assumption: { width: '29%', color: '#777777', fontSize: 9, lineHeight: 1.4 },
  assumptionValue: { fontSize: 13, fontWeight: 600, color: '#14181f', marginBottom: 3 },
  sector: { fontSize: 10.5, lineHeight: 1.7, color: '#444444' },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 25, padding: 18, backgroundColor: '#f1f2ff', border: '1 solid #ececf8', borderRadius: 10 },
  cta: { color: '#ffffff', backgroundColor: '#4b4df7', padding: 10, borderRadius: 7, fontSize: 10, fontWeight: 600, textDecoration: 'none', maxWidth: 160 },
  copy: { flex: 1, color: '#9a9a9a', fontSize: 8, textAlign: 'right', lineHeight: 1.6 },
  priceNote: { fontWeight: 600, color: '#555555' },
});

export async function generateReportPDF(contents: ReturnType<typeof reportContent>[]) {
  return pdf(
    <Document title={contents[0].title} author="Skillvue" language={contents[0].locale}>
      {contents.map((content) => (
      <Page key={content.pill} size="A4" style={styles.page}>
        <Svg height={6} style={{ marginHorizontal: -45 }} viewBox="0 0 595 6">
          <Defs><LinearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0%" stopColor="#f6b24a" /><Stop offset="33%" stopColor="#f4617e" />
            <Stop offset="66%" stopColor="#8b5cf6" /><Stop offset="100%" stopColor="#4b4df7" />
          </LinearGradient></Defs>
          <Rect x="0" y="0" width="595" height="6" fill="url(#brand)" />
        </Svg>
        <View style={styles.top}>
          <Image src="/logos/skillvue-roi-report-logo.png" style={styles.logo} />
          <Text style={styles.pill}>{content.pill}</Text>
        </View>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.meta}>{content.meta}</Text>
        <View style={styles.metrics} wrap={false}>
          {content.metrics.map((metric, i) => <View key={metric.label} style={styles.metric}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={i === 0 ? styles.mainValue : styles.metricValue}>{metric.value}</Text>
          </View>)}
        </View>
        <View style={styles.columns} wrap={false}>
          <View style={styles.column}>
            <Text style={styles.heading}>{content.inputsHeading}</Text>
            {content.inputs.map((input) => <View key={input.label} style={styles.row}>
              <Text style={styles.rowLabel}>{input.label}</Text><Text style={styles.rowValue}>{input.value}</Text>
            </View>)}
          </View>
          <View style={styles.column}>
            <Text style={styles.heading}>{content.driversHeading}</Text>
            {content.drivers.map((driver) => <View key={driver.label} style={styles.row}>
              <Text style={styles.rowLabel}>{driver.label}</Text><Text style={styles.driverValue}>{driver.value}</Text>
            </View>)}
          </View>
        </View>
        <View style={styles.section} wrap={false}>
          <Text style={styles.heading}>{content.assumptionsHeading}</Text>
          <View style={styles.assumptions}>
            {content.assumptions.map((assumption) => <View key={assumption.label} style={styles.assumption}>
              <Text style={styles.assumptionValue}>{assumption.value}</Text><Text>{assumption.label}</Text>
            </View>)}
          </View>
        </View>
        {content.sector && <View style={styles.section} wrap={false}>
          <Text style={styles.heading}>{content.sector.label}</Text><Text style={styles.sector}>{content.sector.body}</Text>
        </View>}
        <View style={styles.footer} wrap={false}>
          <Link src={content.demoUrl} style={styles.cta}>{content.cta}</Link>
          <Text style={styles.copy}>{content.disclaimer} <Text style={styles.priceNote}>{content.priceNote}</Text>{'\n'}{content.copyright}</Text>
        </View>
      </Page>
      ))}
    </Document>,
  ).toBlob();
}
