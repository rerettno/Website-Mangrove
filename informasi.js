async function fetchInformasi() {
    try {
        const response = await fetch('http://localhost:5000/getAllInformasi');
        const data = await response.json();

        if (data.status === 200) {
            const informasiContainer = document.querySelector('.box-container');

            data.Informasi.forEach(info => {
                const box = document.createElement('div');
                box.className = 'box';

                box.innerHTML = `
                    <div class="identitas">
                        <img src="foto/user.png" alt="User Foto">
                        <div class="data-user">
                            <p class="nama">${info.nama}</p>
                            <p class="tanggal">${new Date(info.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p class="detail">Pada lokasi mangrove di <span>${info.kota}</span>, <span>${info.provinsi}</span>, <span>${info.detail}</span></p>
                `;

                informasiContainer.appendChild(box);
            });
        } else {
            console.error('Failed to fetch informasi:', data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function validateForm() {
    const nama = document.getElementById('isi-nama').value;
    const provinsi = document.getElementById('isi-provinsi').value;
    const kota = document.getElementById('isi-kota').value;
    const detail = document.getElementById('isi-detail').value;

    if (!nama || !provinsi || !kota || !detail) {
        event.preventDefault();
        return;
    }

    const dataInformasi = { nama, provinsi, kota, detail };

    try {
        const response = await fetch('http://localhost:5000/createInformasi', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataInformasi)
        });

        const result = await response.json();

        if (result.status === '200') {
            document.querySelector('.popup-overlay-kirim').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.popup-overlay-kirim').style.display = 'none';
                document.querySelector('.popup-overlay-terima').style.display = 'block';
            }, 2000);
        } else {
            alert('Gagal mengirim informasi: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim informasi');
    }
}

function openForm() {
    document.querySelector('.popup-overlay-form').style.display = 'block';
    document.querySelector('.popup-informasi').style.display = 'block';
}

function closeForm() {
    document.querySelector('.popup-overlay-form').style.display = 'none';
    document.querySelector('.popup-informasi').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', fetchInformasi);