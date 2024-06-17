document.addEventListener('DOMContentLoaded', async () => {
        try {
            const response = await fetch('http://localhost:5000/getAllDonate');
            const data = await response.json();
            
            if (response.ok) {
                const totalRelawan = document.getElementById('totalRelawan');
                const totalPohon = document.getElementById('totalPohon');

                totalRelawan.textContent = data.donate.length.toString();
                totalPohon.textContent = data.donate.reduce((acc, curr) => acc + parseInt(curr.jumlah), 0).toString();
            } else {
                console.error('Gagal mengambil data donasi:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });