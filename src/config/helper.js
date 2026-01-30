const bcryptjs = require('bcryptjs')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const slugify = require('slugify')
const dotenv = require('dotenv')
dotenv.config()

class Helper {
    GetResponse(res, status = 200, message = '', data = {}) {
        return res.status(status).json({ status: status, message: message, data: data })
    }

    HashPassword(passwordString) {
        const genSalt = bcryptjs.genSaltSync(12)
        return bcryptjs.hashSync(passwordString, genSalt)
    }

    CheckPassword(inputPassword, userPassword) {
        return bcryptjs.compareSync(inputPassword, userPassword)
    }

    GenerateUuid() {
        const uuid = uuidv4()
        const uuidWithoutHyphens = uuid.replace(/-/g, '')
        return uuidWithoutHyphens 
    }

    GenerateToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRE_TIME })
    }

    getTanggalIndonesia() {
        const formatter = new Intl.DateTimeFormat('id-ID', {
            timeZone: 'Asia/Jakarta',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
        const parts = formatter.formatToParts(new Date());
        const tahun = parts.find(p => p.type === 'year').value;
        const bulan = parts.find(p => p.type === 'month').value;
        const tanggal = parts.find(p => p.type === 'day').value;
        return `${tahun}${bulan}${tanggal}`;
    }

    GenerateCode(codeType) {
        let formattedCode = null
        const randomNumber = Math.floor(10000 + Math.random() * 90000);
        const formattedDate = this.getTanggalIndonesia()
        switch(codeType) {
            case 'room-code':
                formattedCode = `RC-${formattedDate}-${randomNumber}`
                break
            case 'workspace-code':
                formattedCode = `WC-${formattedDate}-${randomNumber}`
                break
            case 'booking-code':
                formattedCode = `BC-${formattedDate}-${randomNumber}`
                break
            case 'transaction-code':
                formattedCode = `TC-${formattedDate}-${randomNumber}`
                break
            default:
                formattedCode = 'Invalid Code. Please delete this item!'
                break
        }
        return formattedCode
    }

    CountBookingDurationDay(startDate, endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (isNaN(start) || isNaN(end)) {
            throw new Error('Format tanggal tidak valid');
        }

        // normalisasi jam biar aman
        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        if (end < start) {
            throw new Error('Tanggal selesai tidak boleh sebelum tanggal mulai');
        }

        const satuHari = 1000 * 60 * 60 * 24;
        const selisihHari = Math.floor((end - start) / satuHari);

        return selisihHari + 1; // inklusif
    }

    GenerateSlug(str) {
        const slugStr = slugify(str, {
            lower: true,
            strict: false
        })
        return slugStr
    }

}

module.exports = new Helper()