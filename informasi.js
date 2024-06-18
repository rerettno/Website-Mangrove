document.addEventListener("DOMContentLoaded", function() {
    fetchInformasi(); // Panggil fungsi fetchInformasi saat DOM siap

    // Fungsi untuk mengambil data informasi dari server
    async function fetchInformasi() {
        try {
            const response = await fetch('http://localhost:5000/getAllInformasi');
            const data = await response.json();

            if (data.status === 200) {
                const informasiContainer = document.querySelector('.box-container');
                informasiContainer.innerHTML = ''; // Pastikan kontainer kosong sebelum mengisi

                data.Informasi.forEach(info => {
                    const box = createInformasiBox(info);
                    informasiContainer.appendChild(box);

                    // Ambil elemen detail di dalam box dan tambahkan tombol "selengkapnya" jika perlu
                    const detailElement = box.querySelector('.detail');
                    if (detailElement.scrollHeight > detailElement.clientHeight) {
                        var selengkapnya = document.createElement('span');
                        selengkapnya.classList.add('selengkapnya');
                        selengkapnya.innerText = ' selengkapnya';
                        detailElement.classList.add('limited');
                        detailElement.parentNode.insertBefore(selengkapnya, detailElement.nextSibling); // Pindahkan "selengkapnya" ke bawah "detail"

                        selengkapnya.addEventListener('click', function(event) {
                            openPopup(detailElement.innerText); // Memasukkan teks detail ke popup
                        });
                    }
                });
            } else {
                console.error('Failed to fetch informasi:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    // Fungsi untuk membuka popup dengan teks detail
    function openPopup(text) {
        const fullDetail = document.querySelector('.full-detail');
        const popupOverlayDetail = document.querySelector('.popup-overlay-detail');
        const popupDetail = document.querySelector('.popup-detail');

        fullDetail.innerText = text; // Memasukkan teks detail ke popup
        popupOverlayDetail.style.display = 'block';
        popupDetail.style.display = 'block';

        // Menengahkan popup di tengah layar
        popupDetail.style.top = '50%';
        popupDetail.style.left = '50%';
        popupDetail.style.transform = 'translate(-50%, -50%)';
    }


    // Tambahkan event listener ke overlay untuk menutup popup detail
    const popupOverlayDetail = document.querySelector('.popup-overlay-detail');
    popupOverlayDetail.addEventListener('click', function(event) {
        if (event.target === popupOverlayDetail) {
            popupOverlayDetail.style.display = 'none';
            document.querySelector('.popup-detail').style.display = 'none';
        }
    });

    // Mencegah penutupan popup detail saat mengklik di dalam popup
    const popupDetail = document.querySelector('.popup-detail');
    popupDetail.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});


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

            // Tambahkan informasi baru di depan
            const informasiContainer = document.querySelector('.box-container');
            const box = createInformasiBox({ ...dataInformasi, createdAt: result.createdAt });
            informasiContainer.prepend(box); // Menambahkan elemen di depan container
        } else {
            alert('Gagal mengirim informasi: ' + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim informasi');
    }
}

function createInformasiBox(info) {
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

    return box;
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