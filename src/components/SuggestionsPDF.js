import {
  Document,
  Page,
  PDFDownloadLink,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { formatSuggestionsForPDF } from "../utils/formatSuggestionsForPDF";

const styles = StyleSheet.create({
  page: { padding: 24 },
  heading: { fontSize: 18, marginBottom: 12, fontWeight: "bold" },
  section: { marginBottom: 12 },
  bullet: { flexDirection: "row", marginBottom: 6 },
  bulletText: { marginLeft: 6, fontSize: 12 },
});

const sanitizeText = (text) =>
  text
    .normalize("NFKD")
    .replace(/[\u{1F600}-\u{1F6FF}]/gu, "") //removes emojis
    .replace(/[^\x00-\x7F]/g, "") //removes weird symbols except safe punctuations
    .replace(/<|>/g, ""); //explicitly removes angle braces

export function ResumeDocument({ resumeText, suggestions }) {
  const suggestionItems = suggestions.split("\n").filter(Boolean);
  const formattedSuggestions = formatSuggestionsForPDF(suggestions || "");

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.heading}>AI-Powered Resume Suggestions</Text>
          {formattedSuggestions.map((item) => (
            <Text
              key={item.id}
              style={{
                fontSize: 10,
                fontWeight: item.type === "heading" ? "bold" : "normal",
                marginBottom: 4,
                marginLeft: item.type === "bullet" ? 10 : 0,
              }}
            >
              {item.type === "bullet" ? "o " : ""}
              {sanitizeText(item.text || "No AI suggestions available.")}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
}

// Exporting a ready-to-click download button
export function SuggestionsPDF({ resumeText, suggestions, fileName }) {
  return (
    <PDFDownloadLink
      document={
        <ResumeDocument resumeText={resumeText} suggestions={suggestions} />
      }
      fileName={fileName || "Resume_Suggestions.pdf"}
      style={{
        textDecoration: "none",
        padding: "8px 16px",
        background: "peach",
        borderRadius: 4,
      }}
    >
      {({ loading }) =>
        loading ? (
          "Generating PDF..."
        ) : (
          <button className="bg-green-800 font-bold text-white px-4 py-2 mt-3 rounded-md hover:bg-green-400">
            Download PDF
          </button>
        )
      }
    </PDFDownloadLink>
  );
}
