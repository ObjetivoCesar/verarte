/**
 * VerArteLoja — Google Apps Script
 * ============================================================
 * INSTRUCCIONES DE INSTALACIÓN:
 * 1. Abre tu Spreadsheet:
 *    https://docs.google.com/spreadsheets/d/1ZiaoyKBSfN30mI0XrVsKkvXzyFToh4DUxQWU4fkO418
 * 2. Ve a  Extensiones > Apps Script
 * 3. Borra el código existente y pega todo este archivo
 * 4. Haz clic en el ícono de guardar (💾)
 * 5. Haz clic en "Implementar" > "Nueva implementación"
 *    - Tipo:              Aplicación web
 *    - Ejecutar como:    Yo (tu cuenta de Google)
 *    - Quién puede acceder: Cualquier persona
 * 6. Haz clic en "Implementar" y COPIA la URL que aparece
 * 7. Pega esa URL en script.js dentro de CONFIG.GOOGLE_SCRIPT_URL
 * ============================================================
 */

const SPREADSHEET_ID = '1ZiaoyKBSfN30mI0XrVsKkvXzyFToh4DUxQWU4fkO418';
const SHEET_NAME = 'Pedidos';

const HEADERS = [
    '📅 Fecha/Hora',
    '👤 Nombre Remitente',
    '🏷️ Código Detalle',
    '🎁 Producto',
    '💰 Precio',
    '🏘️ Barrio',
    '🏠 N° Casa',
    '🛣️ Calle Principal',
    '🔀 Calle Secundaria',
    '📍 Referencia',
    '🎯 Nombre Destinatario',
    '📱 Celular Destinatario',
    '🕐 Hora de Entrega',
    '📆 Fecha de Entrega',
    '💌 Mensaje Personal',
];

function getOrCreateSheet() {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
        sheet = ss.insertSheet(SHEET_NAME);
        // Write and style headers
        sheet.appendRow(HEADERS);
        const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
        headerRange.setBackground('#C2185B');
        headerRange.setFontColor('#FFFFFF');
        headerRange.setFontWeight('bold');
        headerRange.setFontSize(10);
        sheet.setFrozenRows(1);
        sheet.setColumnWidths(1, HEADERS.length, 160);
    }
    return sheet;
}

function doPost(e) {
    try {
        const data = JSON.parse(e.postData.contents);
        const sheet = getOrCreateSheet();
        const tz = 'America/Guayaquil';
        const now = Utilities.formatDate(new Date(), tz, 'dd/MM/yyyy HH:mm:ss');

        sheet.appendRow([
            now,
            data.remitente || '',
            data.codigo || '',
            data.producto || '',
            data.precio ? ('$' + data.precio) : '',
            data.barrio || '',
            data.numCasa || '',
            data.callePrincipal || '',
            data.calleSecundaria || '',
            data.referencia || '',
            data.destinatario || '',
            data.celular || '',
            data.hora || '',
            data.fecha || '',
            (data.de ? `De: ${data.de}\n` : '') + (data.para ? `Para: ${data.para}\n` : '') + (data.mensaje || ''),
        ]);

        return ContentService
            .createTextOutput(JSON.stringify({ success: true, message: '¡Pedido registrado!' }))
            .setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        return ContentService
            .createTextOutput(JSON.stringify({ success: false, error: err.message }))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

// Simple health-check GET
function doGet() {
    return ContentService.createTextOutput('✅ VerArteLoja Orders API — OK');
}
