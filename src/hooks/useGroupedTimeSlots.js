export const useGroupedTimeSlots = (data) => {
	if(!data) return undefined
	return data.reduce((acc, item) => {
			if (!acc[item.weekday]) {
					acc[item.weekday] = { times: [], from: '24:00', to: '00:00' };
			}
			if (!acc[item.weekday].times.includes(item.time)) {
					acc[item.weekday].times.push(item.time);
			}
			const timeParts = item.time.split(':');
			const currentTime = parseInt(timeParts[0] + timeParts[1], 10);
			const fromTime = parseInt(acc[item.weekday].from.split(':').join(''), 10);
			const toTime = parseInt(acc[item.weekday].to.split(':').join(''), 10);

			if (currentTime < fromTime) {
					acc[item.weekday].from = item.time;
			}
			if (currentTime > toTime) {
					acc[item.weekday].to = item.time;
			}

			acc[item.weekday].times.sort();

			return acc;
	}, {});
}