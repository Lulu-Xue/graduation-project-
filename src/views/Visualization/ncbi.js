/* NCBI file reader */

export let availableList = ["Size (Kb)", "GC%", "Protein", "rRNA", "tRNA", "Other RNA", "Gene", "Pseudogene"],
	colorRange = ["#dd4444", "#fec42c", "#80F1BE"],
	backColor = "rgba(28, 29, 38, 1)",
	lineColor = "#666",
	textColor = "#999",
	disableColor = "#333";

export function randomList(NCBIData, listSize) {
	let re = getColumn(NCBIData, 4, 'all');
	re.sort(function () { return 0.5 - Math.random() });
	return re.slice(0, listSize);
}

export function getNCBIValues(NCBIData, NCNumbers) {
	let lines = NCBIData;
	let res = [], count = 0, len = NCNumbers.length;
	for (let i = 1; i < lines.length; i++) {
		if (lines[i]) {
			let nc_no = lines[i].split("\t")[4];
			if (NCNumbers.indexOf(nc_no) >= 0) {
				let line = lines[i].split("\t");
				switch (line[3]) {
					case 'plastid':
						line[3] = "Plastid DNA"; break;
					case 'mitochondrion':
						line[3] = "mtDNA"; break;
					case 'chloroplast':
						line[3] = "cpDNA"; break;
				}
				for (let j = 6; j < line.length; j++) {
					if (line[j] === '-') line[j] = 0;
				}
				res.push(line);
				count++;
			}
			if (count === len) break;
		}
	}
	return res;
}

export function getColumn(NCBIData, columnNumber, type) {
	let lines = NCBIData;
	let re = [];
	for (let i = 1; i < lines.length - 1; i++) { // length-1: the last line is empty
		if (lines[i].split("\t")[3] == type || type == 'all') {
			if (lines[i].split("\t")[columnNumber] == '-') continue; // ignore the '-'
			re.push(lines[i].split("\t")[columnNumber]);
		}
	}
	return re;
}

export function switchColumn(matrix, source, target) {
	for (let i = 0; i < matrix.length; i++) {
		[matrix[i][source], matrix[i][target]] = [matrix[i][target], matrix[i][source]];
		// let t = matrix[i][source];
		// matrix[i][source] = matrix[i][target];
		// matrix[i][target] = t;
	}
}

export function getNCType(NCBIData, NCNumber) {
	// ../CPTree/service/cpdata.php?id=NC_000932.1&type=vdog
	var values = getNCBIValues(NCBIData, NCNumber);
	switch (values[3]) {
		case "mitochondrion":
			return "mtDNA";
		case "chloroplast":
			return "cpDNA";
		case "plastid":
			return "cpDNA";
	}
	return null;
}