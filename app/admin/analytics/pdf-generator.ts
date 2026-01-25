import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Helper for formatting
const formatMoney = (amount: any) => {
    if (typeof amount === 'string') return amount
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF' }).format(amount)
}

// Helper to convert image URL to base64
const getBase64ImageFromURL = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.setAttribute('crossOrigin', 'anonymous')
        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            ctx?.drawImage(img, 0, 0)
            const dataURL = canvas.toDataURL('image/png')
            resolve(dataURL)
        }
        img.onerror = (error) => reject(error)
        img.src = url
    })
}

export const generatePDF = async (data: any, period: string) => {
    const jsPDF = (await import('jspdf')).default
    const autoTable = (await import('jspdf-autotable')).default

    const doc = new jsPDF()
    const config = data.storeConfig || {}

    // --- STYLING TOKENS ---
    const primaryColor = config.primaryColor || '#4f46e5'
    const secondaryColor = config.secondaryColor || '#111827'
    const accentColor = config.accentColor || '#f59e0b'
    const lightGray = '#f9fafb'
    const borderGray = '#e5e7eb'
    const textColor = '#1f2937'
    const muteColor = '#6b7280'

    // --- LOGO HANDLING ---
    const primaryLogoUrl = "https://res.cloudinary.com/da1dmwqhb/image/upload/v1769277829/Instagram_post_-_128_oy1rbm.png"
    let logoBase64 = null
    try {
        logoBase64 = await getBase64ImageFromURL(primaryLogoUrl)
    } catch (e) {
        console.error("Erreur chargement logo primaire:", e)
        if (config.logoUrl) {
            try {
                const absoluteLogoUrl = config.logoUrl.startsWith('http')
                    ? config.logoUrl
                    : `${window.location.origin}${config.logoUrl}`
                logoBase64 = await getBase64ImageFromURL(absoluteLogoUrl)
            } catch (err) { }
        }
    }

    // --- HEADER DESIGN ---
    const leftMargin = 14
    const rightMargin = 196

    // Full width top accent bar - Thicker for premium look
    doc.setFillColor(primaryColor)
    doc.rect(0, 0, 210, 4, 'F')

    // Draw Logo
    if (logoBase64) {
        doc.addImage(logoBase64, 'PNG', leftMargin, 10, 45, 30)
    }

    // Shop Info
    const textStart = logoBase64 ? 65 : leftMargin
    doc.setFontSize(22)
    doc.setTextColor(secondaryColor)
    doc.setFont("helvetica", "bold")
    doc.text((config.name || "Mbor B. Store").toUpperCase(), textStart, 26)

    doc.setFontSize(9)
    doc.setTextColor(primaryColor)
    doc.setFont("helvetica", "bold")
    doc.text("RAPPORT ANALYTIQUE EXPERT", textStart, 32)

    // Contact Details
    doc.setFontSize(8)
    doc.setTextColor(muteColor)
    doc.setFont("helvetica", "normal")
    const contacts = []
    if (config.contactPhone) contacts.push(config.contactPhone)
    if (config.contactEmail) contacts.push(config.contactEmail)
    if (config.address) contacts.push(config.address)
    doc.text(contacts.join("  •  "), textStart, 40)

    // Metadata block (Right side)
    doc.setFontSize(8)
    doc.setTextColor(muteColor)
    doc.setFont("helvetica", "normal")
    doc.text("PÉRIODE :", rightMargin - 22, 26, { align: 'right' })
    doc.setTextColor(secondaryColor)
    doc.setFont("helvetica", "bold")
    doc.text(data.currentMonthLabel, rightMargin, 26, { align: 'right' })

    doc.setFontSize(8)
    doc.setTextColor(muteColor)
    doc.setFont("helvetica", "normal")
    doc.text("ÉDITÉ LE :", rightMargin - 22, 32, { align: 'right' })
    doc.setTextColor(secondaryColor)
    doc.setFont("helvetica", "bold")
    doc.text(new Date().toLocaleDateString('fr-FR'), rightMargin, 32, { align: 'right' })

    // Border bottom header
    doc.setDrawColor(243, 244, 246) // Gray-100
    doc.setLineWidth(0.5)
    doc.line(leftMargin, 48, rightMargin, 48)

    // --- CONTENT START ---
    let yPos = 65

    // SECTION TITLE HELPER
    const drawSectionTitle = (title: string, y: number) => {
        doc.setFontSize(11)
        doc.setTextColor(primaryColor)
        doc.setFont("helvetica", "bold")
        doc.text(title.toUpperCase(), 14, y)
        // Underline
        doc.setDrawColor(primaryColor)
        doc.setLineWidth(0.5)
        doc.line(14, y + 2, 30, y + 2)
        return y + 10
    }

    yPos = drawSectionTitle("Performances Stratégiques", yPos)

    // KPI BOXES
    const kpiData = [
        { label: "Chiffres d'Affaires", value: data.revenue, trend: data.revenueTrend, up: data.revenueUp },
        { label: "Panier Moyen", value: data.aov, trend: data.aovTrend, up: data.aovUp },
        { label: "Nouveaux Clients", value: data.newCustomers, trend: data.customersTrend, up: data.customersUp },
        { label: "Taux Conversion", value: data.conversion, trend: data.conversionTrend, up: data.conversionUp }
    ]

    const boxWidth = 44
    const boxHeight = 25
    const gap = 5

    kpiData.forEach((kpi, i) => {
        const x = 14 + (i * (boxWidth + gap))

        // Shadow/Border
        doc.setDrawColor(borderGray)
        doc.setFillColor('#ffffff')
        doc.roundedRect(x, yPos, boxWidth, boxHeight, 2, 2, 'FD')

        // Label
        doc.setFontSize(7)
        doc.setTextColor(muteColor)
        doc.setFont("helvetica", "bold")
        doc.text(kpi.label.toUpperCase(), x + 4, yPos + 6)

        // Value
        doc.setFontSize(12)
        doc.setTextColor(secondaryColor)
        doc.setFont("helvetica", "bold")
        doc.text(kpi.value.toString(), x + 4, yPos + 16)

        // Trend
        doc.setFontSize(7)
        if (kpi.up) {
            doc.setTextColor(22, 163, 74) // Emerald-600
        } else {
            doc.setTextColor(220, 38, 38) // Red-600
        }
        doc.text(kpi.trend, x + 4, yPos + 21)
    })

    yPos += boxHeight + 20

    // FINANCIALS TABLE
    yPos = drawSectionTitle("Historique et Flux", yPos)

    const compactFormat = (val: any) => {
        const num = typeof val === 'number' ? val : Number(val)
        return new Intl.NumberFormat('fr-FR').format(num) + ' F'
    }

    autoTable(doc, {
        startY: yPos,
        head: [['SÉQUENCE TEMPORELLE', 'MONTANT DES VENTES']],
        body: data.chartData.map((d: any) => [d.fullLabel || d.name, compactFormat(d.value)]),
        theme: 'striped',
        headStyles: { fillColor: secondaryColor, fontSize: 8, halign: 'left' },
        styles: { fontSize: 8, cellPadding: 2.5 },
        columnStyles: {
            0: { cellWidth: 100 },
            1: { halign: 'left', fontStyle: 'bold', textColor: secondaryColor }
        },
        margin: { left: 14, right: 14 }
    })

    yPos = (doc as any).lastAutoTable.finalY + 15

    // OPERATIONS SPLIT
    yPos = drawSectionTitle("Intelligence Opérationnelle", yPos)

    // Multi-column row for smaller tables
    autoTable(doc, {
        startY: yPos,
        head: [['VENTILATION PAR UNIVERS', 'PART (%)']],
        body: data.categoryData.map((c: any) => [c.name, c.value + '%']),
        theme: 'grid',
        headStyles: { fillColor: primaryColor, fontSize: 8 },
        styles: { fontSize: 8 },
        margin: { right: 110, left: 14 },
        tableWidth: 90
    })

    autoTable(doc, {
        startY: yPos,
        head: [['CANAUX DE PAIEMENT', 'TRANSACTIONS']],
        body: data.paymentMethods.map((p: any) => [p.name, p.value]),
        theme: 'grid',
        headStyles: { fillColor: accentColor, fontSize: 8 },
        styles: { fontSize: 8 },
        margin: { left: 110, right: 14 },
        tableWidth: 90
    })

    yPos = Math.max((doc as any).lastAutoTable.finalY, (doc as any).lastAutoTable.finalY) + 15

    // PAGE BREAK FOR PRODUCTS
    if (yPos > 210) {
        doc.addPage()
        yPos = 20
    }

    yPos = drawSectionTitle("Architecture des Ventes - Top 5 Produits", yPos)

    autoTable(doc, {
        startY: yPos,
        head: [['CLASSEMENT', 'NOM DU PRODUIT', 'VOLUMETRIE', 'VALEUR GÉNÉRÉE']],
        body: data.topProducts.map((p: any, i: number) => [
            `RANG #${i + 1}`,
            p.name,
            `${p.sales} unités`,
            p.revenue
        ]),
        theme: 'striped',
        headStyles: { fillColor: secondaryColor, fontSize: 8 },
        styles: { fontSize: 8, cellPadding: 4 },
        columnStyles: {
            0: { textColor: muteColor },
            2: { halign: 'center' },
            3: { halign: 'right', fontStyle: 'bold', textColor: secondaryColor }
        }
    })

    // --- FOOTER ---
    const pageCount = (doc as any).internal.getNumberOfPages()
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)

        // Border bottom
        doc.setDrawColor(borderGray)
        doc.line(14, 282, 196, 282)

        doc.setFontSize(7)
        doc.setTextColor(muteColor)
        doc.setFont("helvetica", "normal")

        // Left
        doc.text(`Rapport généré automatiquement par le système Mbor B. Store v2.0`, 14, 287)

        // Right
        doc.text(`Page ${i} sur ${pageCount}`, 196, 287, { align: 'right' })
    }

    doc.save(`Rapport_Expert_${period}_${new Date().getTime()}.pdf`)
}
